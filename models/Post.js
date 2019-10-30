const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    unitsRequired: {
        type: Number,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    hospital:{
        type: String,
        required: true
    },
    relationWithPatient:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    additionalInstruction:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    postedTime:{
        type: Number,
        required: true
    },
    volunteers:{
        type:Array,
        default: []
    },
    comments:{
        type:Array,
        default: []
    },
    status:{
        type:String,
        default:"Not Fulfilled"
    }
})

const CreatePost = mongoose.model('Posts', PostSchema)

module.exports = CreatePost;