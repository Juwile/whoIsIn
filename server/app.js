const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema_repro');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // to read Env files
const path = require('path'); //core node js module

const webSocketServer = require('websocket').server;

const app = express();

// allow cross-origin requests (from one server to other)
app.use(cors());



// connect to mlab database
mongoose.connect(process.env.DB_URL);
mongoose.connection.once('open', () => {
    console.log('connected to database');
})


app.use('/graphql', graphqlHTTP({
    schema, // schema is now in this middleware function
    graphiql: true // Tool, Playground for graphql
})); // graphql Endpoint


// damit auf Production die Files aus dem build Ordner geladen werden
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 4000;

const server = app.listen(PORT,() => {
    console.log('now listening on requests on port ${PORT}')
});

// Serve static assets 

if(process.env.NODE_ENV === 'production') { 
    //set static folder 
    app.use(express.static('client/build'));  
    app.get('*', (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
    });
 } 

// Socket setup
const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    const connection = request.accept(null, request.origin);
    clients[userID] = connection; // will be stored in const clients
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

    connection.on('message', function(message){
        if (message.type === 'utf8') {
            console.log('received message: ', message.utf8Data);

            // broadcasting message to all connected clients
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
            }
        }
    })
});