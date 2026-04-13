const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password, phone, status, vehicle } = req.body;
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ error: 'Captain with this email already exists' });
        }
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            fullname: {
                firstName: fullname.firstName || fullname.firstname,
                lastName: fullname.lastName || fullname.lastname
            },
            email,
            password: hashedPassword,
            phone,
            status,
            vehicle: {
                color: vehicle.color,
                vehicleType: String(vehicle.vehicleType).toLowerCase(),
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity
            }
        });
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({ message: 'Captain registered successfully', token, captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await captain.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = captain.generateAuthToken();
        captain.password = undefined;
        res.cookie('token', token);
        res.status(200).json({ message: 'Captain logged in successfully', token, captain });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    try {
        const captain = req.captain;
        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        res.status(200).json({ captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ error: 'No token provided' });
        }

        await blacklistTokenModel.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};