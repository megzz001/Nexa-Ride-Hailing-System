const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname').custom((fullname) => {
        const firstName = fullname?.firstName || fullname?.firstname;
        if (!firstName || firstName.length < 3) {
            throw new Error('First name must be at least 3 characters long');
        }
        return true;
    }),
    body('fullname').custom((fullname) => {
        const lastName = fullname?.lastName || fullname?.lastname;
        if (!lastName || lastName.length < 3) {
            throw new Error('Last name must be at least 3 characters long');
        }
        return true;
    }),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['rider', 'driver', 'admin']).withMessage('Role must be either rider, driver, or admin')
], userController.registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;