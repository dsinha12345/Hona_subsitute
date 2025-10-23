const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },
  caseNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  currentPhase: {
    type: Number,
    default: 1,
    min: 1,
    max: 15
  },
  language: {
    type: String,
    enum: ['en', 'es'],
    default: 'en'
  },
  lastWatchedVideo: {
    phaseNumber: Number,
    videoId: String,
    timestamp: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);