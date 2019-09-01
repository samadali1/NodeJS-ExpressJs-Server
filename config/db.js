const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://sammadali:03132187752@cluster0-wap1h.mongodb.net/Test?retryWrites=true&w=majority";

mongoose.connect(mongoURI);

module.exports = mongoose;