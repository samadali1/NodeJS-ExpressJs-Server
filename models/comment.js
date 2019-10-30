const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
    postedTime:{
        type:Number,
        required:true,
    },
    comment:{
        type: String,
        required: true
    }
})

const comment = mongoose.model('comments', commentSchema )

module.exports = comment;