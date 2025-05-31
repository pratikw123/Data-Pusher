const Destination = require('../models/destination');
const Account = require('../models/account');

exports.createDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers } = req.body;
    const accountId = req.params.accountId;
    if (!url || !httpMethod || !headers) {
      return res.status(400).json({ message: 'url, httpMethod, and headers are required' });
    }
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const destination = await Destination.create({ url, httpMethod, headers, AccountId: accountId });
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getDestinationsByAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const account = await Account.findByPk(accountId, { include: Destination });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account.Destinations);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers } = req.body;
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    destination.url = url || destination.url;
    destination.httpMethod = httpMethod || destination.httpMethod;
    destination.headers = headers || destination.headers;
    await destination.save();
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    await destination.destroy();
    res.json({ message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
