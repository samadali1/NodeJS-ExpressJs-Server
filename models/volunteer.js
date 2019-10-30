const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    bloodgroup:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

const volunteer = mongoose.model('volunteers', volunteerSchema )

module.exports = volunteer;