/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

var connection1 = require('./../../config/dataSources/users.dataSource');

var userSchema = new mongoose.Schema({
    userName : {
        type: String
    },

    email : {
        type:String
    },


    designation : {
        type:String
    },

    role : {
        type:String
    },
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

});
UserModel = mongoose.model('User',userSchema);

module.exports =  UserModel;