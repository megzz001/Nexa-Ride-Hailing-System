const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname,email , password, color, vehicleType, plateNumber, capacity
}) => {
    try {
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            throw new Error('Captain with this email already exists');
        }
        if(!firstname || !lastname || !email || !password || !color || !vehicleType || !plateNumber || !capacity){
            throw new Error('All fields are required');
        }
        const captain = await captainModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password,
            color,
            vehicleType,
            plateNumber,
            capacity
        });
        return captain;
    }
    catch (error) {
        throw new Error(error.message);
    }
};