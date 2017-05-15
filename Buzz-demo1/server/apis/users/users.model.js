/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var connection1 = require('./../../config/dataSources/users.dataSource');

var userSchema = new mongoose.Schema({
    userName : {
        type: String
    },

    googleId : {
      type: String
    },
    email : {
        type:String
    },

    domain :{
      type:String
    },

    gender :{
        type:String
    },

    userImage :{
        type:String
    },

    designation : {
        type:String
    },

    role : {
        type:String
    },


},{timestamps: true});
UserModel = mongoose.model('User',userSchema);

module.exports =  UserModel;

//============================================================

/*title:  String,
 author: String,
 body:   String,
 comments: [{ body: String, date: Date }],*/


/*createdDate: {
 type: Date,
 default: Date.now
 },*/

/*updatedDate : {
 type:Date,
 default: Date.now
 }*/