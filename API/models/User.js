const mongoose = require('mongoose');

// Mongoose User-Schema
const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    applications : {
        type : Array,
        default : []
    },
    created : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);