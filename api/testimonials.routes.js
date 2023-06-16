const express = require('express');
const router = express.Router();
const testimonials = require('../db').testimonials;
const sendOkStatus = require('../utils/sendOkStatus');
const sendErrorStatus = require('../utils/sendErrorStatus');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  if (req.params.id === 'random') {
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    res.json(testimonials[randomIndex]);
  } else {
    res.json(testimonials.find(item => item.id === req.params.id));
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  
  if(author && text) {
    const newId = uuidv4();
    testimonials.push({ id: newId, author: author, text: text });
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  
  if(id && author && text) {
    const item = testimonials.find(item => item.id === id);
    item.author = author;
    item.text = text;
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  
  if(id) {
    const indexToRemove = testimonials.findIndex(item => item.id === id);
    if (indexToRemove !== -1) {
      testimonials.splice(indexToRemove, 1);
    }
    sendOkStatus(res);
  }
  else {
    sendErrorStatus(res);
  }
});

module.exports = router;
