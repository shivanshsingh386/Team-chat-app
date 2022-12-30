// importing express
const express = require('express');
const userRouter = require('./routers/userRouter');
const cors = require('cors');

// initializing express
const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { cors : ['http://localhost:3000'] });

io.on("connection", (socket) => {
    console.log('client conncted');

    socket.on('sendmsg', (data) => {
        data.sent = false;
        socket.broadcast.emit('recmsg', data);
    })
  });

const port = 5000;

app.use( cors({ origin : [ 'http://localhost:3000' ] }) );
app.use(express.json());

// middleware
app.use( '/user', userRouter );

// route
app.get('/', (req, res) => {
    res.send('response from express');
});

app.get( '/home', (req, res) => {
    res.send('response from home');
});

app.get( '/add', (req, res) => {
    res.send('response from add');
});

app.get( '/update', (req, res) => {
    res.send('response from update');
});


// starting the server
httpServer.listen( port, () => { console.log('server started') });