const Account = require('../models/account');

exports.createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    if (!email || !accountName) {
      return res.status(400).json({ message: 'Email and accountName are required' });
    }
    const account = await Account.create({ email, accountName, website });
    res.status(201).json(account);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email must be unique' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    account.email = email || account.email;
    account.accountName = accountName || account.accountName;
    account.website = website || account.website;
    await account.save();
    res.json(account);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email must be unique' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    await account.destroy();
    res.json({ message: 'Account and associated destinations deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
