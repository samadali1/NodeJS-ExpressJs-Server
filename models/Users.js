const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    address: String,
    age: Number,
})

const Users = mongoose.model('users', UsersSchema)

module.exports = Users;