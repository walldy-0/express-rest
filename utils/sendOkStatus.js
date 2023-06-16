const db = require('../db');

const sendOkStatus = res => res.status(200).json({ message: 'OK' });

module.exports = sendOkStatus;
