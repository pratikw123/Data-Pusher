const Account = require('../models/account');
const Destination = require('../models/destination');
const forwardData = require('../utils/forwarder');

exports.handleIncomingData = async (req, res) => {
  try {
    const token = req.header('CL-X-TOKEN');
    if (!token) {
      return res.status(401).json({ message: 'Un Authenticate' });
    }

    // Ensure JSON body
    if (req.method !== 'POST' || !req.is('application/json')) {
      return res.status(400).json({ message: 'Invalid Data' });
    }

    const account = await Account.findOne({ where: { appSecretToken: token } });
    if (!account) {
      return res.status(401).json({ message: 'Un Authenticate' });
    }

    const data = req.body;
    const destinations = await Destination.findAll({ where: { AccountId: account.id } });

    // Forward data to each destination
    const results = [];
    for (let dest of destinations) {
      try {
        const result = await forwardData(dest, data);
        results.push({ destinationId: dest.id, status: result.status });
      } catch (err) {
        results.push({ destinationId: dest.id, error: err.message });
      }
    }

    res.json({ forwarded: results });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
