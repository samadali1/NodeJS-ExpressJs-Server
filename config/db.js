// const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://sammadali:03132187752@cluster0-wap1h.mongodb.net/Test?retryWrites=true&w=majority";

// mongoose.connect(mongoURI);

// module.exports = mongoose;

//

const mongoose = require("mongoose");

// connection URI
const mongoURI = "mongodb+srv://sammadali:03132187752@cluster0-wap1h.mongodb.net/Test?retryWrites=true&w=majority";

// remove deprecation warning of collection.ensureIndex
mongoose.set('useCreateIndex', true);

// connect to mongodb
mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose;