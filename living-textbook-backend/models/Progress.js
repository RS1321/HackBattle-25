const mongoose = require('mongoose');

const pathProgressSchema = new mongoose.Schema({
    pathId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completionDate: Date,
    timeSpent: { // in minutes
        type: Number,
        default: 0
    },
    score: Number,
    attempts: Number,
    lastAccessed: Date
});

const puzzleAttemptSchema = new mongoose.Schema({
    puzzleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content.puzzles'
    },
    pathId: String,
    completed: {
        type: Boolean,
        default: false
    },
    score: Number,
    attempts: {
        type: Number,
        default: 0
    },
    bestTime: Number, // in seconds
    lastAttempt: Date,
    answers: [mongoose.Schema.Types.Mixed]
});

const topicProgressSchema = new mongoose.Schema({
    topicId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completionDate: Date,
    overallScore: Number,
    timeSpent: Number,
    pathsCompleted: {
        type: Number,
        default: 0
    },
    totalPaths: Number,
    progressPercentage: {
        type: Number,
        default: 0
    },
    paths: [pathProgressSchema],
    puzzleAttempts: [puzzleAttemptSchema],
    lastAccessed: {
        type: Date,
        default: Date.now
    }
});

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topics: [topicProgressSchema],
    totalPoints: {
        type: Number,
        default: 0
    },
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    completedTopics: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    achievements: [{
        achievementId: String,
        earnedAt: Date,
        points: Number
    }]
}, {
    timestamps: true
});

// Ensure one progress document per user
progressSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);