const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  responses: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
