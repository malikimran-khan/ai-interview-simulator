const express = require('express');
const router = express.Router();
const { signup, login  , getUserProfile , updateUserProfile} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
module.exports = router;
