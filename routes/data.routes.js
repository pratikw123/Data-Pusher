const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/dataHandler.controller');

router.post('/incoming_data', dataHandler.handleIncomingData);

module.exports = router;
