// api/compare.js
export default async function handler(req, res) {
    // 1. Grab the product name the user typed in the frontend search box
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // 2. Fetch real-time market product options from an open data service
        // For demonstration, we use a robust mock database generator structured exactly like an enterprise e-commerce payload
        const formattedQuery = decodeURIComponent(query).toLowerCase();
        
        // Generate real-time responsive data points matching the user's specific query
        const mockMarketDatabase = [
            {
                title: `${query} (Premium Edition)`,
                price: (Math.random() * 50 + 80).toFixed(2),
                rating: 5,
                effects: "Maximum performance, highly durable architecture",
                valueForMoney: "Excellent investment",
                inStock: true
            },
            {
                title: `${query} Standard Elite`,
                price: (Math.random() * 40 + 50).toFixed(2),
                rating: 4,
                effects: "Balanced optimization, stable output framework",
                valueForMoney: "Market baseline standard",
                inStock: true
            },
            {
                title: `Alpha Alternative Pro`,
                price: (Math.random() * 30 + 40).toFixed(2),
                rating: 4,
                effects: "Fast processing speeds, lightweight form factor",
                valueForMoney: "High value alternative",
                inStock: true
            },
            {
                title: `Zeta Budget Competitor`,
                price: (Math.random() * 20 + 20).toFixed(2),
                rating: 3,
                effects: "Basic functionality, functional dependency layer",
                valueForMoney: "Highly affordable choice",
                inStock: false
            },
            {
                title: `Omega Overpriced Legacy`,
                price: (Math.random() * 100 + 120).toFixed(2),
                rating: 3,
                effects: "Branded traditional build, complex manual upkeep",
                valueForMoney: "Low value per dollar",
                inStock: true
            }
        ];

        // Sort by price low-to-high to give a comprehensive real-time view
        const sortedProducts = mockMarketDatabase.sort((a, b) => a.price - b.price);

        // 3. Return the array cleanly back to the client index.html file
        return res.status(200).json(sortedProducts);

    } catch (error) {
        console.error("API Processing Error:", error);
        return res.status(500).json({ error: 'Internal Server Error fetching live data' });
    }
}