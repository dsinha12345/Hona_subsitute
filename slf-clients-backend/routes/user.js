const router = require('express').Router();
const User = require('../models/User');

// Middleware to verify token (we'll improve this later)
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // For now, just pass through - we'll add JWT verification later
  next();
};

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  // Temporary - return mock user
  res.json({
    id: '1',
    email: 'client@demo.com',
    name: 'John Doe',
    role: 'client',
    currentPhase: 8,
    caseNumber: 'CASE-2024-001'
  });
});

module.exports = router;