const express = require('express');
const router = express.Router();
const seats = require('../db').seats;
const sendOkStatus = require('../utils/sendOkStatus');
const sendErrorStatus = require('../utils/sendErrorStatus');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(seats.find(item => item.id === req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  
  if(day && seat && client && email) {
    if (!seats.some(item => (item.seat === seat && item.day === day))) {
      const newId = uuidv4();
      seats.push({ id: newId, day: day, seat: seat, client: client, email: email });
      req.io.emit('seatsUpdated', seats);
      sendOkStatus(res);
    } else {
      res.status(400).json({ message: "The slot is already taken..." });
    }
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id;
  
  if(day && seat && client && email) {
    const item = seats.find(item => item.id === id);
    item.day = day;
    item.seat = seat;
    item.client = client;
    item.email = email;
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  
  if(id) {
    const indexToRemove = seats.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      seats.splice(indexToRemove, 1);
    }
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

module.exports = router;
