const express = require('express');
const router = express.Router();
const {
  startInterview,
  saveInterview,
  getInterviews,
  getFeedback,
  getWeakAreas
} = require('../controllers/interviewController');

router.post('/start', startInterview);
router.post('/save', saveInterview);
router.get('/:userId', getInterviews);
router.post('/get-feedback', getFeedback); // ✅ FIXED: POST and correct path
router.post('/get-weak-areas', getWeakAreas);

module.exports = router;
