const mongoose = require('mongoose');

const videoProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phaseNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 15
  },
  videoId: {
    type: String,
    required: true
  },
  watched: {
    type: Boolean,
    default: false
  },
  watchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

videoProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model('VideoProgress', videoProgressSchema);