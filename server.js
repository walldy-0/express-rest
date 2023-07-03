const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./api/testimonials.routes');
const contertsRoutes = require('./api/concerts.routes');
const seatsRoutes = require('./api/seats.routes');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', contertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port:' + process.env.PORT);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New connection, id: ' + socket.id);
});
