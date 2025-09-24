const Progress = require('../models/Progress');
const Content = require('../models/Content');
const PuzzleAttempt = require('../models/PuzzleAttempt');

// Update path progress
const updatePathProgress = async (req, res) => {
    try {
        const { topicId, pathId } = req.params;
        const { completed, timeSpent, score } = req.body;

        // Find or create progress document
        let progress = await Progress.findOne({ user: req.user._id });
        
        if (!progress) {
            progress = await Progress.create({ user: req.user._id });
        }

        // Find topic progress or create new one
        let topicProgress = progress.topics.find(t => t.topicId === topicId);
        
        if (!topicProgress) {
            const topic = await Content.findOne({ topicId });
            if (!topic) {
                return res.status(404).json({
                    success: false,
                    message: 'Topic not found'
                });
            }

            topicProgress = {
                topicId,
                totalPaths: topic.paths.length,
                paths: [],
                puzzleAttempts: []
            };
            progress.topics.push(topicProgress);
            topicProgress = progress.topics[progress.topics.length - 1];
        }

        // Find path progress or create new one
        let pathProgress = topicProgress.paths.find(p => p.pathId === pathId);
        
        if (!pathProgress) {
            pathProgress = {
                pathId,
                attempts: 0
            };
            topicProgress.paths.push(pathProgress);
            pathProgress = topicProgress.paths[topicProgress.paths.length - 1];
        }

        // Update path progress
        pathProgress.lastAccessed = new Date();
        pathProgress.attempts = (pathProgress.attempts || 0) + 1;
        
        if (completed !== undefined) {
            pathProgress.completed = completed;
            if (completed) {
                pathProgress.completionDate = new Date();
                pathProgress.score = score || pathProgress.score;
                
                // Update topic completion status
                const completedPaths = topicProgress.paths.filter(p => p.completed).length;
                topicProgress.pathsCompleted = completedPaths;
                topicProgress.progressPercentage = Math.round((completedPaths / topicProgress.totalPaths) * 100);
                
                if (completedPaths === topicProgress.totalPaths) {
                    topicProgress.completed = true;
                    topicProgress.completionDate = new Date();
                    progress.completedTopics += 1;
                }
            }
        }

        if (timeSpent) {
            pathProgress.timeSpent = (pathProgress.timeSpent || 0) + timeSpent;
            topicProgress.timeSpent = (topicProgress.timeSpent || 0) + timeSpent;
            progress.totalTimeSpent = (progress.totalTimeSpent || 0) + timeSpent;
        }

        if (score) {
            pathProgress.score = Math.max(pathProgress.score || 0, score);
            progress.totalPoints = (progress.totalPoints || 0) + score;
        }

        progress.lastActivity = new Date();
        topicProgress.lastAccessed = new Date();

        await progress.save();

        res.json({
            success: true,
            message: 'Progress updated successfully',
            data: { progress: topicProgress }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating progress',
            error: error.message
        });
    }
};

// Submit puzzle attempt
const submitPuzzleAttempt = async (req, res) => {
    try {
        const { topicId, pathId } = req.params;
        const { answers, timeTaken } = req.body;

        // Get puzzle data to validate answers
        const topic = await Content.findOne({ topicId });
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
                message: 'Puzzle not found'
            });
        }

        // Validate answers (simplified - you'd implement specific validation per puzzle type)
        const isCorrect = validatePuzzleAnswers(puzzle, answers);
        const score = isCorrect ? puzzle.points : 0;

        // Save puzzle attempt
        const puzzleAttempt = await PuzzleAttempt.create({
            user: req.user._id,
            topicId,
            pathId,
            puzzleType: puzzle.type,
            puzzleData: puzzle.data,
            userAnswers: answers,
            isCorrect,
            score,
            timeTaken
        });

        // Update progress if puzzle is correct
        if (isCorrect) {
            await updatePathProgress(req, res, {
                topicId,
                pathId,
                completed: true,
                score
            });
        }

        res.json({
            success: true,
            data: {
                correct: isCorrect,
                score,
                attemptId: puzzleAttempt._id
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting puzzle attempt',
            error: error.message
        });
    }
};

// Helper function to validate puzzle answers
const validatePuzzleAnswers = (puzzle, userAnswers) => {
    switch (puzzle.type) {
        case 'matching':
            // Implement matching validation logic
            return validateMatchingPuzzle(puzzle.solution, userAnswers);
        case 'timeline':
            // Implement timeline validation logic
            return validateTimelinePuzzle(puzzle.solution, userAnswers);
        default:
            return false;
    }
};

const validateMatchingPuzzle = (solution, userAnswers) => {
    // Simple validation - in reality, you'd have more complex logic
    return JSON.stringify(solution) === JSON.stringify(userAnswers);
};

const validateTimelinePuzzle = (solution, userAnswers) => {
    // Validate timeline order
    return JSON.stringify(solution) === JSON.stringify(userAnswers);
};

// Get user's topic progress
const getTopicProgress = async (req, res) => {
    try {
        const { topicId } = req.params;

        const progress = await Progress.findOne({ user: req.user._id });
        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found'
            });
        }

        const topicProgress = progress.topics.find(t => t.topicId === topicId);
        
        res.json({
            success: true,
            data: { progress: topicProgress || {} }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topic progress',
            error: error.message
        });
    }
};

module.exports = {
    updatePathProgress,
    submitPuzzleAttempt,
    getTopicProgress
};