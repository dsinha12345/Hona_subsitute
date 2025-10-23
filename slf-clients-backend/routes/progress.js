const router = require('express').Router();
const VideoProgress = require('../models/VideoProgress');
const jwt = require('jsonwebtoken');

// Middleware to get user from token
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

// Get progress for a phase
router.get('/phase/:phaseNumber', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const progress = await VideoProgress.find({
      userId,
      phaseNumber: req.params.phaseNumber
    });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark video as watched/unwatched
router.post('/video/:videoId/watched', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
    const { phaseNumber, watched = true } = req.body;
    
    if (watched) {
      await VideoProgress.findOneAndUpdate(
        { userId, videoId: req.params.videoId },
        { 
          userId,
          videoId: req.params.videoId,
          phaseNumber,
          watched: true,
          watchedAt: new Date()
        },
        { upsert: true, new: true }
      );
    } else {
      await VideoProgress.deleteOne({
        userId,
        videoId: req.params.videoId
      });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;