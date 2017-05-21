/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');
var categoryType=["Lost and Found","Activity"]
var connection2 = require('./../../config/dataSources/users.dataSource');
//var groupPic = require('./../../../src/assets/images/groupPic.jpg')

var buzzSchema = new mongoose.Schema({

    buzzContent: {
        type: String,
        required: true
    },
    buzzImage :  String,

    category:{
        type: String,
        default: 'Activity',
        enum: categoryType
    },
    comments:[{
        createdBy: {
            type:String,
            ref: 'User'
        },
        type: String,
    },{timestamps: true}],

    like : [{
            type:String,
            ref:'User'

    }],

    dislike : [{
            type: String,
            ref: 'User'
    }],

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{timestamps:true });

module.exports = mongoose.model('Buzz',buzzSchema);