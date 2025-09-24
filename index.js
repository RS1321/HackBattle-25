import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// ==================== ENVIRONMENT VALIDATION ====================
const requiredEnvVars = ['GOOGLE_API_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ CRITICAL ERROR: Missing ${envVar}`);
    console.error('💡 Solution: Create a .env file with GOOGLE_API_KEY=your_gemini_key_here');
    process.exit(1);
  }
}

console.log('✅ Environment variables loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== GEMINI SETUP ====================
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==================== ROUTES ====================

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend is running with Gemini",
    timestamp: new Date().toISOString()
  });
});

// --- Route: Fetch Wikipedia Sections ---
app.post("/api/fetch-wiki", async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "No topic provided" });

  try {
    console.log("Fetching Wikipedia content for:", topic);

    // First try the summary API for better content
    try {
      const summaryRes = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`,
        { timeout: 10000 }
      );
      
      if (summaryRes.data.extract) {
        const section = {
          heading: summaryRes.data.title || topic,
          text: summaryRes.data.extract,
        };
        return res.json([section]);
      }
    } catch (summaryError) {
      console.log("Summary API failed, trying extracts API...");
    }

    // Fallback to extracts API
    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&format=json&titles=${encodeURIComponent(topic)}&origin=*`,
      { timeout: 10000 }
    );

    const pages = response.data.query?.pages || {};
    
    if (Object.keys(pages).length === 0 || pages[-1]) {
      return res.status(404).json({ error: "Wikipedia page not found" });
    }

    const page = Object.values(pages)[0];
    
    if (!page || page.missing === true) {
      return res.status(404).json({ error: "Wikipedia page not found" });
    }

    let extract = page.extract || "";

    // Ensure we have sufficient content
    if (extract.length < 200) {
      return res.status(404).json({ error: "Insufficient content available for this topic" });
    }

    const section = {
      heading: page.title || topic,
      text: extract,
    };

    console.log(`Fetched content: ${extract.length} characters`);
    res.json([section]);
  } catch (err) {
    console.error("Wiki fetch error:", err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(408).json({ error: "Request timeout" });
    }
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "Wikipedia page not found" });
    }
    
    res.status(500).json({ error: "Failed to fetch Wikipedia page" });
  }
});

// --- Route: Generate Questions with Gemini ---
app.post("/api/generate-questions", async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string' || text.trim().length < 50) {
    return res.status(400).json({ 
      error: "Valid text with at least 50 characters is required" 
    });
  }

  try {
    console.log("Generating questions for text length:", text.length);

    const prompt = `
You are an AI teacher creating interactive learning questions. Based on the text below, generate 3-5 questions.

TEXT: "${text}"

IMPORTANT: Return ONLY valid JSON array. Each question object must have:
- id (number)
- type ("mcq", "tf", or "matching")
- questionText (string)
- options (array of strings, for mcq only)
- answer (string, the correct answer)
- pairs (array of {left, right} objects, for matching only)

EXAMPLE FORMAT:
[
  {
    "id": 1,
    "type": "mcq",
    "questionText": "What is the main topic?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  },
  {
    "id": 2, 
    "type": "tf",
    "questionText": "This statement is true.",
    "answer": "True"
  }
]

Return ONLY the JSON array, no other text.
`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text().trim();
    
    console.log("Gemini raw response length:", raw.length);
    console.log("Gemini response preview:", raw.substring(0, 200) + "...");

    let questions = [];
    try {
      // Clean the response
      let cleanRaw = raw.replace(/```json\n?|\n?```/g, '').trim();
      
      // Remove any text before the first [ and after the last ]
      const jsonStart = cleanRaw.indexOf('[');
      const jsonEnd = cleanRaw.lastIndexOf(']') + 1;
      
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanRaw = cleanRaw.substring(jsonStart, jsonEnd);
      }
      
      questions = JSON.parse(cleanRaw);
      console.log("Successfully parsed", questions.length, "questions");
    } catch (e) {
      console.error("JSON parse error:", e.message);
      console.log("Raw response that failed to parse:", raw);
      
      // Use fallback questions
      questions = getFallbackQuestions();
    }

    // Validate questions array
    if (!Array.isArray(questions) || questions.length === 0) {
      console.warn("No valid questions generated. Using fallback questions.");
      questions = getFallbackQuestions();
    }

    // Ensure each question has required fields
    questions = questions.map((q, index) => ({
      id: q.id || index + 1,
      type: q.type || "mcq",
      questionText: q.questionText || "Question about the text",
      options: q.options || [],
      answer: q.answer || "",
      pairs: q.pairs || []
    })).filter(q => q.questionText.length > 0);

    console.log("Sending", questions.length, "questions to frontend");
    res.json(questions);
  } catch (err) {
    console.error("Gemini API error:", err);
    
    // Send fallback questions on error
    const fallbackQuestions = getFallbackQuestions();
    res.json(fallbackQuestions);
  }
});

// --- Fallback Questions Function ---
function getFallbackQuestions() {
  return [
    {
      id: 1,
      type: "mcq",
      questionText: "What is the main topic discussed in the text?",
      options: ["Science and technology", "Historical events", "Geographical information", "Cultural aspects"],
      answer: "Science and technology"
    },
    {
      id: 2,
      type: "tf",
      questionText: "The text provides detailed factual information about the topic.",
      answer: "True"
    },
    {
      id: 3,
      type: "mcq",
      questionText: "Based on the text, what can you infer about the importance of this topic?",
      options: [
        "It is well-researched and significant",
        "It is controversial and debated", 
        "It is recently discovered",
        "It is primarily fictional"
      ],
      answer: "It is well-researched and significant"
    }
  ];
}

// ==================== SERVER STARTUP ====================
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🤖 Using Google Gemini AI`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  console.error('❌ Server startup error:', err.message);
});