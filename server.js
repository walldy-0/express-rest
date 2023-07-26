const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./api/testimonials.routes');
const concertsRoutes = require('./api/concerts.routes');
const seatsRoutes = require('./api/seats.routes');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

const connString = 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(connString, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New connection, id: ' + socket.id);
});
