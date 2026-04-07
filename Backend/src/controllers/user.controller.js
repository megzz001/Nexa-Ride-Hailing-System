const userModel = require('../models/user.model');

module.exports.registerUser = async (req, res) => {
    try {
        const {fullname, email, password, role} = req.body;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }
        const hashedPassword = await userModel.hashPassword(password);
        const newUser = new userModel({
            fullname,  
            email,
            password: hashedPassword,
            role   
        });
        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({message: 'User registered successfully', token});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error'});
    }
};