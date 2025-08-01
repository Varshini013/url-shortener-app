const express = require('express');
const cors = require('cors');
const shortUrlRoutes = require('./routes/shorturls');
const logger = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger); // Custom middleware
app.use('/', shortUrlRoutes);

module.exports = app;
