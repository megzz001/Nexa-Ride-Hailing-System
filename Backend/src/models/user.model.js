const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['rider', 'driver', 'admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;