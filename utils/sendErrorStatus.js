const sendErrorStatus = res => res.status(400).json({ error: 'Something went wrong' });

module.exports = sendErrorStatus;
