require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/db/db');
const { Server } = require('socket.io');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Socket.IO event handlers
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (data) => {
        socket.userId = data.userId;
        socket.userType = data.userType;
        console.log(`${data.userType} ${data.userId} joined`);
    });

    socket.on('update-location-captain', (data) => {
        io.emit('captain-location-updated', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

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

