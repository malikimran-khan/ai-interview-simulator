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
router.post('/feedback', getFeedback);
router.post('/weak-areas', getWeakAreas);

module.exports = router;
