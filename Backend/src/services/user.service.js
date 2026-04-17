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
    const user = await userModel.create({
        fullname:{
            firstName: fullname.firstName || fullname.firstname,
            lastName: fullname.lastName || fullname.lastname
        },
        email,
        password,
        role
    })
    return user;
}