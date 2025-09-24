const express = require('express');
const { getUserProgress, getLeaderboard } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/progress', auth, getUserProgress);
router.get('/leaderboard', auth, getLeaderboard);

module.exports = router;