import { useState, useEffect } from "react";
import axios from "axios";

export default function InteractiveSection({ section }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!section?.text) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        console.log("Sending text to generate questions:", section.text.substring(0, 100) + "...");
        
        const res = await axios.post("http://localhost:5000/api/generate-questions", {
          text: section.text,
        });
        
        console.log("Backend response:", res.data);
        
        // FIX: Backend sends questions directly, no need to parse content
        if (Array.isArray(res.data) && res.data.length > 0) {
          setQuestions(res.data);
        } else {
          setError("No questions generated. Try a different topic.");
          setQuestions(getFallbackQuestions());
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to generate questions. Using sample questions.");
        setQuestions(getFallbackQuestions());
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [section]);

  const getFallbackQuestions = () => {
    return [
      {
        id: 1,
        type: "mcq",
        questionText: "What is the main topic discussed in the text?",
        options: ["Science", "History", "Technology", "Geography"],
        answer: "Science"
      },
      {
        id: 2,
        type: "tf",
        questionText: "The text provides detailed information about this topic.",
        answer: "True"
      }
    ];
  };

  const handleAnswer = (qId, selected, answer) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, userAnswer: selected, correct: selected === answer } : q
      )
    );
  };

  return (
    <div className="my-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
      <p className="mb-4 whitespace-pre-line">{section.text}</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500">Generating interactive questions...</p>}

      {!loading && questions.length === 0 && !error && (
        <p className="text-gray-500">No questions generated for this section.</p>
      )}

      {!loading && questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Interactive Questions</h3>
          {questions.map((q) => (
            <div key={q.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <p className="font-medium mb-3 text-lg">{q.questionText}</p>

              {q.type === "mcq" && (
                <div className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`block w-full text-left p-3 border rounded-lg transition-colors ${
                        q.userAnswer === opt 
                          ? (q.correct ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500") 
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => handleAnswer(q.id, opt, q.answer)}
                      disabled={q.userAnswer}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "tf" && (
                <div className="flex space-x-4">
                  {["True", "False"].map((opt) => (
                    <button
                      key={opt}
                      className={`flex-1 p-3 border rounded-lg transition-colors ${
                        q.userAnswer === opt 
                          ? (q.correct ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500") 
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => handleAnswer(q.id, opt, q.answer)}
                      disabled={q.userAnswer}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "matching" && q.pairs && (
                <div className="space-y-2">
                  {q.pairs.map((pair, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-2 bg-white rounded border">
                      <span className="font-medium flex-1">{pair.left}</span>
                      <span className="text-gray-400">→</span>
                      <span className="flex-1">{pair.right}</span>
                    </div>
                  ))}
                </div>
              )}

              {q.userAnswer && (
                <p className={`mt-3 font-semibold ${q.correct ? "text-green-600" : "text-red-600"}`}>
                  {q.correct ? "✅ Correct!" : "❌ Incorrect. Try again!"}
                  {!q.correct && <span className="block text-sm mt-1">Correct answer: {q.answer}</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}