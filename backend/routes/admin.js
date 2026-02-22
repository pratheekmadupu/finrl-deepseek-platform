const express = require('express');
const jwt = require('jsonwebtoken');
const { users, analyses } = require('../dataStore');
const router = express.Router();

// Middleware to verify admin role
const adminOnly = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log('Admin Access Denied: No Token');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        const user = users.find(u => u.id === decoded.id);

        if (!user || user.role !== 'admin') {
            console.log('Admin Access Denied: Invalid User or Role', { userId: decoded.id, role: user?.role });
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        req.userId = user.id;
        console.log('Admin Access Granted:', user.email);
        next();
    } catch (err) {
        console.log('Admin Access Denied: Token Invalid', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all users
router.get('/users', adminOnly, async (req, res) => {
    try {
        // Return users without passwords
        const usersList = users.map(({ password, ...rest }) => rest);
        res.json(usersList);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Get all analysis history
router.get('/all-analysis', adminOnly, async (req, res) => {
    try {
        const allAnalysis = analyses.map(a => {
            const user = users.find(u => u.id === a.userId);
            return {
                ...a,
                userId: { email: user ? user.email : 'Unknown' }
            };
        }).sort((a, b) => b.createdAt - a.createdAt);

        res.json(allAnalysis);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch analysis history' });
    }
});

// Delete user
router.delete('/users/:id', adminOnly, async (req, res) => {
    try {
        const index = users.findIndex(u => u.id === req.params.id);
        if (index !== -1) {
            users.splice(index, 1);
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Get market overview (gainers/losers)
router.get('/market-data', adminOnly, async (req, res) => {
    try {
        const companies = [
            { symbol: 'AAPL', name: 'Apple Inc.' },
            { symbol: 'MSFT', name: 'Microsoft Corp.' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.' },
            { symbol: 'NVDA', name: 'NVIDIA Corp.' },
            { symbol: 'TSLA', name: 'Tesla Inc.' },
            { symbol: 'META', name: 'Meta Platforms Inc.' },
            { symbol: 'AMD', name: 'Advanced Micro Devices' }
        ];

        const marketData = companies.map(company => {
            const change = (Math.random() * 10 - 5).toFixed(2);
            return {
                ...company,
                price: (Math.random() * 500 + 100).toFixed(2),
                change: parseFloat(change),
                volume: (Math.random() * 100).toFixed(1) + 'M'
            };
        });

        res.json(marketData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch market data' });
    }
});

module.exports = router;
