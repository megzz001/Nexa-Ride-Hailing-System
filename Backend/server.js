require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 

});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the existing process or change PORT in .env.`);
        process.exit(1);
    }
    console.error('Server failed to start:', error);
    process.exit(1);
});

