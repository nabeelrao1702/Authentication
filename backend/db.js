const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.MONGO_URI;

const db = () => mongoose.connect(uri);

module.exports = db;