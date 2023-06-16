const express = require('express');
const cors = require('cors');

const app = express();

const testimonialsRoutes = require('./api/testimonials.routes');
const contertsRoutes = require('./api/concerts.routes');
const seatsRoutes = require('./api/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', contertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
