const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to get user from token
const getUserFromToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return null;
  }
};

// Get current user
router.get('/me', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      currentPhase: user.currentPhase,
      caseNumber: user.caseNumber,
      language: user.language,
      lastWatchedVideo: user.lastWatchedVideo
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update current phase
router.patch('/phase', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const { phase } = req.body;
    
    await User.findByIdAndUpdate(userId, { currentPhase: phase });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update last watched video
router.patch('/last-video', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const { phaseNumber, videoId } = req.body;
    
    await User.findByIdAndUpdate(userId, {
      lastWatchedVideo: {
        phaseNumber,
        videoId,
        timestamp: new Date()
      }
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
