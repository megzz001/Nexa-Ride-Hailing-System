const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    (req, res, next) => {
        const { fullname, vehicle } = req.body;

        if (fullname) {
            req.body.fullname = {
                firstName: fullname.firstName || fullname.firstname,
                lastName: fullname.lastName || fullname.lastname,
            };
        }

        if (vehicle) {
            req.body.vehicle = {
                color: vehicle.color,
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity,
                vehicleType: typeof vehicle.vehicleType === 'string'
                    ? vehicle.vehicleType.toLowerCase()
                    : vehicle.vehicleType,
            };
        }

        next();
    },
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isLength({ min: 10, max: 15 }).withMessage('Phone number must be valid'),
    body('fullname.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Vehicle type must be car, auto, or bike'),
    body('vehicle.plateNumber').isLength({ min: 3 }).withMessage('Vehicle license plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
], captainController.registerCaptain);  

router.post('/login', async (req, res) => {
    // Login logic for captains
    res.send('Captain login endpoint');
});


module.exports = router;