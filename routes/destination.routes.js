const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');

// Create a destination for a specific account
router.post('/accounts/:accountId/destinations', destinationController.createDestination);

// Get all destinations for a specific account
router.get('/accounts/:accountId/destinations', destinationController.getDestinationsByAccount);

// CRUD for individual destinations
router.get('/:id', destinationController.getDestinationById);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
