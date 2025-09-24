const Content = require('../models/Content');

// Get all topics
const getTopics = async (req, res) => {
    try {
        const { category, difficulty, publishedOnly = true } = req.query;
        
        let filter = {};
        if (publishedOnly) filter.isPublished = true;
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;

        const topics = await Content.find(filter)
            .select('topicId title description icon category difficulty estimatedTotalDuration')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { topics },
            count: topics.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topics',
            error: error.message
        });
    }
};

// Get single topic
const getTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        
        const topic = await Content.findOne({ 
            topicId,
            isPublished: true 
        });

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.json({
            success: true,
            data: { topic }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topic',
            error: error.message
        });
    }
};

// Get topic path
const getTopicPath = async (req, res) => {
    try {
        const { topicId, pathId } = req.params;
        
        const topic = await Content.findOne({ 
            topicId,
            isPublished: true 
        });

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        const path = topic.paths.find(p => p.id === pathId);
        
        if (!path) {
            return res.status(404).json({
                success: false,
                message: 'Path not found'
            });
        }

        res.json({
            success: true,
            data: { path }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching path',
            error: error.message
        });
    }
};

// Get puzzle for path
const getPathPuzzle = async (req, res) => {
    try {
        const { topicId, pathId } = req.params;
        
        const topic = await Content.findOne({ 
            topicId,
            isPublished: true 
        });

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        const puzzle = topic.puzzles.find(p => p.pathId === pathId);
        
        if (!puzzle) {
            return res.status(404).json({
                success: false,
                message: 'Puzzle not found for this path'
            });
        }

        // Return puzzle without solution for security
        const puzzleData = { ...puzzle.toObject() };
        delete puzzleData.solution;

        res.json({
            success: true,
            data: { puzzle: puzzleData }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching puzzle',
            error: error.message
        });
    }
};

// Admin: Create topic
const createTopic = async (req, res) => {
    try {
        const topicData = {
            ...req.body,
            createdBy: req.user._id
        };

        const topic = await Content.create(topicData);

        res.status(201).json({
            success: true,
            message: 'Topic created successfully',
            data: { topic }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating topic',
            error: error.message
        });
    }
};

// Admin: Update topic
const updateTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        
        const topic = await Content.findOneAndUpdate(
            { topicId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.json({
            success: true,
            message: 'Topic updated successfully',
            data: { topic }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating topic',
            error: error.message
        });
    }
};

module.exports = {
    getTopics,
    getTopic,
    getTopicPath,
    getPathPuzzle,
    createTopic,
    updateTopic
};