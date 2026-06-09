// api/compare.js
export default async function handler(req, res) {
    // Enable CORS for smooth browser communication
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { query, category } = req.query;

    if (!query) {
        return res.status(200).json({ error: true, message: 'Query parameter is required' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        return res.status(200).json({ 
            error: true, 
            message: 'API Key missing in Vercel Environment Variables.' 
        });
    }

    try {
        const productName = decodeURIComponent(query);
        
        const prompt = `
        You are an expert product analyst for the Indian market.
        First, use your Google Search tool to find the current live retail prices, customer reviews, and top 4 active competing alternatives available in India right now for: "${productName}" (Category: ${category || 'General'}).
        
        Based on your real-time search results, populate and return a valid JSON response matching this exact structure. 
        Do not estimate or use outdated pricing—extract exact live values from the current web results. Use current Indian Rupee (₹) structures.

        {
          "inputProduct": {
            "name": "Full Product Name",
            "brand": "Brand",
            "price": "₹XX,XXX",
            "priceNum": 0,
            "reviewScore": 4.5,
            "valueForMoney": 85,
            "qualityBuild": 80,
            "effectiveness": 90,
            "popularity": 88,
            "bestFor": "Target audience layout",
            "warranty": "e.g., 1 Year Brand Warranty",
            "verdict": "Short summary based on live store availability"
          },
          "alternatives": [
            {
              "name": "Live Competitor Name 1",
              "brand": "Brand",
              "price": "₹XX,XXX",
              "priceNum": 0,
              "reviewScore": 4.2,
              "valueForMoney": 80,
              "qualityBuild": 85,
              "effectiveness": 85,
              "popularity": 80,
              "bestFor": "...",
              "warranty": "...",
              "verdict": "..."
            }
          ],
          "winner": {
            "name": "Name of best product out of all choices calculated from live values",
            "reason": "Clear explanation citing current market pricing and reviews"
          }
        }
        Note: Generate exactly 4 items in the alternatives array so the UI renders exactly 5 items total. Do not include any markdown backticks.
        `;

        // FIXED: Using v1beta endpoint with standard model path to safely support tools and json config structure
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                tools: [{ google_search: {} }], 
                generationConfig: { 
                    response_mime_type: "application/json"
                } 
            })
        });

        const rawData = await response.json();

        if (rawData.error) {
            return res.status(200).json({ 
                error: true, 
                message: `Gemini API Error: ${rawData.error.message}` 
            });
        }

        if (!rawData.candidates || !rawData.candidates[0]?.content?.parts?.[0]?.text) {
            return res.status(200).json({ 
                error: true, 
                message: 'AI live search was empty or blocked by temporary safety constraints. Try another item.' 
            });
        }
        
        const aiText = rawData.candidates[0].content.parts[0].text;
        const finalJson = JSON.parse(aiText);

        return res.status(200).json(finalJson);

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(200).json({ 
            error: true, 
            message: `Server Error: ${error.message}` 
        });
    }
}
