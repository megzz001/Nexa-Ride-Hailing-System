const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistToken = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.authUser = async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers?.authorization;
    const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlackListed = await blacklistToken.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;

        return next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlackListed = await blacklistToken.findOne({ token: token });

    if (isBlackListed) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        console.error('Error authenticating captain:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};