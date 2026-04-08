const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const {fullname, email, password, role} = req.body;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            fullname,  
            email,
            password: hashedPassword,
            role   
        });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({message: 'User registered successfully', token , user});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        user.password = undefined;

        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};