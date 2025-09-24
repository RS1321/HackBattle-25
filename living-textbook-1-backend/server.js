const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Wikipedia API endpoint
app.get('/api/wiki', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ 
                error: 'Wikipedia URL is required' 
            });
        }

        // Validate Wikipedia URL
        if (!url.includes('wikipedia.org')) {
            return res.status(400).json({ 
                error: 'Please provide a valid Wikipedia URL' 
            });
        }

        console.log('Fetching Wikipedia content from:', url);
        
        const content = await fetchWikipediaContent(url);
        res.json(content);
        
    } catch (error) {
        console.error('Error fetching Wikipedia content:', error);
        res.status(500).json({ 
            error: 'Failed to fetch Wikipedia content',
            details: error.message 
        });
    }
});

// Function to fetch and parse Wikipedia content
async function fetchWikipediaContent(url) {
    try {
        // Fetch the Wikipedia page
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Extract title
        const title = $('#firstHeading').text().trim();
        
        // Extract main content
        const contentDiv = $('#mw-content-text .mw-parser-output');
        
        // Remove unwanted elements
        $('.navbox, .infobox, .reference, .mw-editsection, .hatnote', contentDiv).remove();
        
        // Extract summary (first few paragraphs)
        const summary = $('p', contentDiv).first().text().trim();
        
        // Extract main content sections
        const sections = [];
        let currentSection = null;
        
        $('> *', contentDiv).each((index, element) => {
            const $element = $(element);
            
            // Check if it's a heading
            if (element.tagName.match(/^h[1-6]$/)) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                
                currentSection = {
                    title: $element.text().trim(),
                    level: parseInt(element.tagName[1]),
                    content: []
                };
            } 
            // Add content to current section
            else if (currentSection) {
                const content = extractContentFromElement($, $element);
                if (content) {
                    currentSection.content.push(content);
                }
            }
        });
        
        // Add the last section
        if (currentSection) {
            sections.push(currentSection);
        }
        
        // Extract images
        const images = [];
        $('img', contentDiv).each((index, element) => {
            const src = $(element).attr('src');
            const alt = $(element).attr('alt') || '';
            
            if (src && !src.includes('Wikimedia') && !src.includes('MathMenu')) {
                // Convert to full URL if it's a relative path
                const imageUrl = src.startsWith('//') ? 'https:' + src : 
                               src.startsWith('/') ? 'https://en.wikipedia.org' + src : src;
                
                images.push({
                    url: imageUrl,
                    alt: alt,
                    caption: $(element).closest('.thumb').find('.thumbcaption').text().trim() || ''
                });
            }
        });
        
        // Extract infobox data if available
        const infobox = {};
        $('.infobox tr').each((index, element) => {
            const label = $('.infobox-label', element).text().trim();
            const data = $('.infobox-data', element).text().trim();
            
            if (label && data) {
                infobox[label] = data;
            }
        });
        
        return {
            title,
            summary,
            url,
            sections,
            images: images.slice(0, 5), // Limit to 5 images
            infobox: Object.keys(infobox).length > 0 ? infobox : null,
            fetchedAt: new Date().toISOString()
        };
        
    } catch (error) {
        throw new Error(`Failed to parse Wikipedia content: ${error.message}`);
    }
}

// Helper function to extract content from different element types
function extractContentFromElement($, $element) {
    const tagName = $element[0].tagName;
    const text = $element.text().trim();
    
    if (!text) return null;
    
    switch (tagName) {
        case 'p':
            return { type: 'paragraph', content: text };
            
        case 'ul':
        case 'ol':
            const items = [];
            $('li', $element).each((i, li) => {
                items.push($(li).text().trim());
            });
            return { type: 'list', style: tagName, items };
            
        case 'table':
            const rows = [];
            $('tr', $element).each((i, tr) => {
                const row = [];
                $('td, th', $(tr)).each((j, cell) => {
                    row.push($(cell).text().trim());
                });
                if (row.length > 0) rows.push(row);
            });
            return { type: 'table', rows };
            
        case 'blockquote':
            return { type: 'quote', content: text };
            
        default:
            if (text.length > 50) { // Only include substantial content
                return { type: 'text', content: text };
            }
            return null;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Wikipedia Content Extractor API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Wikipedia Content Extractor API is ready!`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});