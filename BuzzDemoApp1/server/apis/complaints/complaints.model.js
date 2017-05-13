/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

var connection3 = require('./../../config/dataSources/users.dataSource');

var complaintCategory = ["Hardware","Software","Others"];

var complaintsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    category:{
        type: String,
        enum: complaintCategory,
        required: true
    },
    assignedTo:{
        type:String,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Complaint',complaintsSchema);