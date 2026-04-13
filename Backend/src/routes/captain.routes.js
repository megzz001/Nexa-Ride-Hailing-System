const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname').notEmpty().withMessage('Name is required'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle model must be at least 3 characters long'),
    body('vehicle.plateNumber').isLength({ min: 3 }).withMessage('Vehicle license plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
], captainController.registerCaptain);  

router.post('/login', async (req, res) => {
    // Login logic for captains
    res.send('Captain login endpoint');
});


module.exports = router;