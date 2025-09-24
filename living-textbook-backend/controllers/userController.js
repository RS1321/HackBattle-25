const User = require('../models/User');
const Progress = require('../models/Progress');

// Get user progress statistics
const getUserProgress = async (req, res) => {
    try {
        const progress = await Progress.findOne({ user: req.user._id })
            .populate('user', 'username profile')
            .populate('topics.topicId');

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress data not found'
            });
        }

        res.json({
            success: true,
            data: { progress }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching progress data',
            error: error.message
        });
    }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const { limit = 10, timeframe = 'all' } = req.query;
        
        let dateFilter = {};
        if (timeframe === 'week') {
            dateFilter = { lastActivity: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
        } else if (timeframe === 'month') {
            dateFilter = { lastActivity: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
        }

        const leaderboard = await Progress.find(dateFilter)
            .populate('user', 'username profile.avatar')
            .sort({ totalPoints: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: { leaderboard }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leaderboard',
            error: error.message
        });
    }
};

module.exports = {
    getUserProgress,
    getLeaderboard
};