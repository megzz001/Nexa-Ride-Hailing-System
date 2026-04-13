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
        res.status(201).json({ message: 'Captain registered successfully', token, captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
