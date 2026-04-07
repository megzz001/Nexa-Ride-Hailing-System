const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load Backend/.env by default; fallback to workspace root .env.
dotenv.config();
if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
}

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('Missing MongoDB URI. Set MONGODB_URI (or MONGO_URI) in Backend/.env');
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;