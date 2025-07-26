const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'other'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  featured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Skill', skillSchema); 