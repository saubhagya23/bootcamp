/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

require('./../../config/dataSources/users.dataSource');

var complaintCategory = ["Hardware","Software","Infrastructure"];
var complaintStatus = ["Pending","Resolved","Closed"];

var complaintsSchema = new mongoose.Schema({
    compTitle: {
        type: String,
        required: true
    },
    compName:{
        type:String,
        required:true
    },
    compEmail:{
        type:String,
        required:true
    },
    compContent: {
        type:String
    },

    compImage: String,

    category:{
        type: String,
        enum: complaintCategory,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    compStatus:{
        type:String,
        enum: complaintStatus,
        default:'Pending'
    }


},{timestamps:true });

module.exports = mongoose.model('Complaint',complaintsSchema);