const express = require('express');
const router = express.Router();
const concerts = require('../db').concerts;
const sendOkStatus = require('../utils/sendOkStatus');
const sendErrorStatus = require('../utils/sendErrorStatus');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(concerts.find(item => item.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  if(performer && genre && price && day && image) {
    const newId = uuidv4();
    concerts.push({ id: newId, performer: performer, genre: genre, price: price, day: day, image: image });
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;
  
  if(id && performer && genre && price && day && image) {
    const item = concerts.find(item => item.id === id);
    item.performer = performer;
    item.genre = genre;
    item.price = price;
    item.day = day;
    item.image = image;
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  
  if(id) {
    const indexToRemove = concerts.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      concerts.splice(indexToRemove, 1);
    }
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

module.exports = router;
