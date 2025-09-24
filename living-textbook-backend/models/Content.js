const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    estimatedDuration: Number, // in minutes
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    }
});

const puzzleSchema = new mongoose.Schema({
    pathId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['matching', 'timeline', 'multiple-choice', 'fill-blank'],
        required: true
    },
    question: {
        type: String,
        required: true
    },
    data: mongoose.Schema.Types.Mixed, // Flexible structure for different puzzle types
    solution: mongoose.Schema.Types.Mixed,
    points: {
        type: Number,
        default: 10
    }
});

const externalResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['article', 'video', 'interactive', 'documentation'],
        default: 'article'
    }
});

const topicSchema = new mongoose.Schema({
    topicId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    introduction: {
        type: String,
        required: true
    },
    icon: String,
    category: {
        type: String,
        required: true
    },
    paths: [pathSchema],
    puzzles: [puzzleSchema],
    externalResources: [externalResourceSchema],
    prerequisites: [{
        type: String, // topicIds
    }],
    estimatedTotalDuration: Number,
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt before saving
topicSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Content', topicSchema);