const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    fullname, email, password, phone, status, vehicle
}) => {
    try {
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            throw new Error('Captain with this email already exists');
        }
        if (
            !fullname?.firstName ||
            !fullname?.lastName ||
            !email ||
            !password ||
            !phone ||
            !vehicle?.color ||
            !vehicle?.vehicleType ||
            !vehicle?.plateNumber ||
            !vehicle?.capacity
        ) {
            throw new Error('All fields are required');
        }
        const captain = await captainModel.create({
            fullname:{
                firstName: fullname.firstName,
                lastName: fullname.lastName
            },
            email,
            password,
            phone,
            status,
            vehicle: {
                color: vehicle.color,
                vehicleType: vehicle.vehicleType,
                plateNumber: vehicle.plateNumber,
                capacity: vehicle.capacity
            }
        });
        return captain;
    }
    catch (error) {
        throw new Error(error.message);
    }
};