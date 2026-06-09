// api/compare.js
export default async function handler(req, res) {
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const productName = decodeURIComponent(query);
        
        // Base price calculation to make mock data feel realistic relative to each other
        const basePriceNum = Math.floor(Math.random() * 40000) + 5000;

        // Function to format Indian Currency easily
        const formatINR = (num) => `₹${num.toLocaleString('en-IN')}`;

        const comparisonData = {
            inputProduct: {
                name: productName,
                brand: "Target Brand",
                category: "General",
                price: formatINR(basePriceNum),
                priceNum: basePriceNum,
                reviewScore: 4.2,
                valueForMoney: 82,
                qualityBuild: 85,
                effectiveness: 80,
                popularity: 88,
                pros: ["Well known", "Good support"],
                cons: ["Can be pricey"],
                bestFor: "General use",
                verdict: "A solid choice but facing tough competition.",
                warranty: "1 Year",
                availability: "Widely available",
                ecoFriendly: true,
                yearLaunched: 2024
            },
            alternatives: [
                {
                    name: `${productName} Pro Max`,
                    brand: "Premium Tier",
                    price: formatINR(basePriceNum + 15000),
                    priceNum: basePriceNum + 15000,
                    reviewScore: 4.8,
                    valueForMoney: 75,
                    qualityBuild: 95,
                    effectiveness: 98,
                    popularity: 90,
                    bestFor: "Power users",
                    verdict: "Top tier performance if budget is no issue.",
                    warranty: "2 Years",
                    ecoFriendly: false,
                    yearLaunched: 2024
                },
                {
                    name: `Alpha Alternative`,
                    brand: "Market Challenger",
                    price: formatINR(basePriceNum - 4000),
                    priceNum: basePriceNum - 4000,
                    reviewScore: 4.5,
                    valueForMoney: 92,
                    qualityBuild: 88,
                    effectiveness: 85,
                    popularity: 95,
                    bestFor: "Value hunters",
                    verdict: "Offers 90% of the features for a fraction of the cost.",
                    warranty: "1 Year",
                    ecoFriendly: true,
                    yearLaunched: 2023
                },
                {
                    name: `Zeta Budget Edition`,
                    brand: "Budget Tier",
                    price: formatINR(basePriceNum - 8000),
                    priceNum: basePriceNum - 8000,
                    reviewScore: 3.8,
                    valueForMoney: 95,
                    qualityBuild: 70,
                    effectiveness: 75,
                    popularity: 80,
                    bestFor: "Tight budgets",
                    verdict: "Great entry-level option, but compromises on build.",
                    warranty: "6 Months",
                    ecoFriendly: false,
                    yearLaunched: 2023
                },
                {
                    name: `Omega Classic`,
                    brand: "Legacy Brand",
                    price: formatINR(basePriceNum + 2000),
                    priceNum: basePriceNum + 2000,
                    reviewScore: 4.0,
                    valueForMoney: 80,
                    qualityBuild: 90,
                    effectiveness: 78,
                    popularity: 85,
                    bestFor: "Brand loyalists",
                    verdict: "Reliable and sturdy, though slightly outdated tech.",
                    warranty: "1 Year",
                    ecoFriendly: false,
                    yearLaunched: 2022
                },
                {
                    name: `EcoSmart Alternative`,
                    brand: "Green Tech",
                    price: formatINR(basePriceNum + 5000),
                    priceNum: basePriceNum + 5000,
                    reviewScore: 4.3,
                    valueForMoney: 85,
                    qualityBuild: 82,
                    effectiveness: 88,
                    popularity: 75,
                    bestFor: "Eco-conscious buyers",
                    verdict: "Sustainable materials with minimal performance drop.",
                    warranty: "1.5 Years",
                    ecoFriendly: true,
                    yearLaunched: 2024
                }
            ],
            winner: {
                name: "Alpha Alternative",
                reason: "Provides the best balance of features, high build quality, and an aggressive price point for the Indian market."
            },
            category: "General",
            avgPrice: formatINR(basePriceNum + 2000),
            insight: "The market is leaning heavily towards high value-for-money alternatives."
        };

        return res.status(200).json(comparisonData);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: 'Failed to process Indian market data' });
    }
}
