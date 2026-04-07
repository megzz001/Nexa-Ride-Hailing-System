const userModel = require('../models/user.model');

module.exports.createUser = async({
    fullname,
    email,
    password,
    role
}) => {
    if (!fullname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname:{
            firstName: fullname.firstName,
            lastName: fullname.lastName
        },
        email,
        password,
        role
    })
    return user;
}