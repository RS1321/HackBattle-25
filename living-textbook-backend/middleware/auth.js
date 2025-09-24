const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. No token provided.' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token.' 
            });
        }

        if (!user.isActive) {
            return res.status(401).json({ 
                success: false, 
                message: 'Account is deactivated.' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token.' 
        });
    }
};

const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            req.user = user;
        }
        
        next();
    } catch (error) {
        next();
    }
};

const adminAuth = [auth, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admin privileges required.' 
        });
    }
    next();
}];

module.exports = { auth, optionalAuth, adminAuth };