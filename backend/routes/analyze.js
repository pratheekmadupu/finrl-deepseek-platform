const express = require('express');
const jwt = require('jsonwebtoken');
const { analyses } = require('../dataStore');
const router = express.Router();

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.post('/analyze', auth, async (req, res) => {
    const { ticker, news_text } = req.body;

    try {
        // Mocking the AI pipeline
        const Sf = (Math.random() * 2 - 1).toFixed(2);
        const Rf = (Math.random()).toFixed(2);
        const recScore = Math.floor(Math.random() * 5) + 1;
        const riskScore = Math.floor(Math.random() * 5) + 1;
        const actions = ['BUY', 'SELL', 'HOLD'];
        const decision = actions[Math.floor(Math.random() * actions.length)];
        const confidence = (Math.random() * 40 + 60).toFixed(2);
        const allocation = `${(Math.random() * 20 + 5).toFixed(1)}% of LP`;

        const generateChartData = (len, start) => {
            let current = start;
            return Array.from({ length: len }, () => {
                current += (Math.random() - 0.5) * 2;
                return parseFloat(current.toFixed(2));
            });
        };

        const metrics = {
            priceChart: generateChartData(30, 150),
            equityCurve: generateChartData(30, 10000),
            drawdown: generateChartData(30, 0).map(v => Math.min(0, v)),
            riskDistribution: Array.from({ length: 10 }, () => Math.random() * 10),
        };

        const newAnalysis = {
            id: Date.now().toString(),
            userId: req.userId,
            ticker,
            newsText: news_text,
            sf: Sf,
            rf: Rf,
            recommendationScore: recScore,
            riskScore: riskScore,
            tradingAction: decision,
            confidence,
            portfolioAllocation: allocation,
            metrics,
            createdAt: new Date()
        };

        analyses.push(newAnalysis);

        res.json(newAnalysis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Analysis failed' });
    }
});

router.get('/history', auth, async (req, res) => {
    try {
        const history = analyses
            .filter(a => a.userId === req.userId)
            .sort((a, b) => b.createdAt - a.createdAt);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch history' });
    }
});

module.exports = router;
