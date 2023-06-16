const db = require('../db');

//const sendOkStatus = res => res.status(200).json({ message: 'OK' });
const sendOkStatus = res => res.json(db.testimonials);

module.exports = sendOkStatus;
