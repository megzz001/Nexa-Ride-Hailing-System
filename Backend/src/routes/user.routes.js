const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const {body} = require('express-validator');

router.post('/register', [
    body('fullname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['rider', 'driver', 'admin']).withMessage('Role must be either rider, driver, or admin')
], require('../controllers/user.controller').registerUser); 


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname').isLength({min:3}).withMessage('Full name must be an object with firstName and lastName'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], require('../controllers/user.controller').loginUser
)


module.exports = router;