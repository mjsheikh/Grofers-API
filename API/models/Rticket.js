const mongoose = require('mongoose');

// Mongoose Ticket-Schema
const RticketSchema = mongoose.Schema({
    lottery : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    prize : {
        type : String,
        required : true
    },
    applicants : {
        type : Array,
        default : []
    },
    winner : {
        type : String,
        default : "Not Declared"
    },
    date : {
        type : Date,
        default : Date.now
    },
    time : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Rticket', RticketSchema);