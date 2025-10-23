const router = require('express').Router();
const VideoProgress = require('../models/VideoProgress');

// Get progress for a phase
router.get('/phase/:phaseNumber', async (req, res) => {
  try {
    // For now, return empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark video as watched
router.post('/video/:videoId/watched', async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;