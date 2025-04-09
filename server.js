// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Import the Server class from socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server); // Initialize Socket.IO, passing it the HTTP server

const PORT = process.env.PORT || 3000;

// Serve the index.html file when someone visits the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Set of users
var typingUsers = new Set();
var typingTimer;

// --- Socket.IO Logic ---
io.on('connection', (socket) => {
    let userID = socket.id;
    console.log('✅ A user connected:', socket.id); // Log when a new client connects

    socket.on('set username', (username) => { // Mark inner callback as async too for await
        //filter/check username first just incase
        const regex = /^[a-zA-Z0-9_-]+$/;
        if (!regex.test(username) || username.length < 3 || username.length > 20 || typeof username !== 'string'){
            console.log('Invalid Name');
            userID = socket.id; //should potentially be a alert in the future...
        } else {
            userID = username;
            console.log(`👤 User ${socket.id} set username to: ${username}`);
        }
        socket.emit('joinMessage', `✅ ${userID} Has Connected to Chat!`);
    });
        
    // Listen for 'chat message' events from a client
    socket.on('chat message', (msg) => {
        console.log(`💬 Message received [${userID}]:`, msg);
        // Broadcast the message to ALL connected clients (including the sender)
        io.emit('chat message', `${userID}: ${msg}`);
    });

    //Listen for 'typing' events
    socket.on('typing', () => {

        //time logic is done on server side too, to ensure no client side scripting...
        if (!typingUsers.has(userID)){
            console.log(`⌨ User ${userID} is typing.`);
            typingUsers.add(userID);
            socket.broadcast.emit('user typing', userID);//emmited to every other user

            typingTimer = setTimeout(() => {
                typingUsers.delete(userID);
            }, 7000);
            
        } else {
            clearTimeout(typingTimer); 
            typingTimer = setTimeout(() => {
                typingUsers.delete(userID);
            }, 7000);
        }


    });

    socket.on('stop typing', () => {
        console.log(`🛑 User ${userID} stopped typing.`);

        typingUsers.delete(userID);
        socket.broadcast.emit('user stopped typing', userID);//emmited to every other user

    });

    // Listen for 'disconnect' events
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', userID);
        if (typingUsers.has(userID)){
            socket.broadcast.emit('user stopped typing', userID);
        }
    });
});
// --- End Socket.IO Logic ---


// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});