const express = require('express');
const { 
    getTopics, 
    getTopic, 
    getTopicPath, 
    getPathPuzzle,
    createTopic,
    updateTopic
} = require('../controllers/contentController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/topics', getTopics);
router.get('/topics/:topicId', getTopic);
router.get('/topics/:topicId/paths/:pathId', getTopicPath);
router.get('/topics/:topicId/paths/:pathId/puzzle', getPathPuzzle);

// Admin routes
router.post('/topics', adminAuth, createTopic);
router.put('/topics/:topicId', adminAuth, updateTopic);

module.exports = router;