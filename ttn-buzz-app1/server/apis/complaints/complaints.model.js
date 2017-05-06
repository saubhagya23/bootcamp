/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

var connection3 = require('./../../config/dataSources/users.dataSource');

var connection3 = new mongoose.Schema({
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
        enum: [hardware, software, others],
        required: true
    },

});