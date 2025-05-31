const express = require('express');
const bodyParser = require('express').json;
const accountRoutes = require('./routes/account.routes');
const destinationRoutes = require('./routes/destination.routes');
const dataRoutes = require('./routes/data.routes');

const app = express();

app.use(bodyParser());

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

module.exports = app;
