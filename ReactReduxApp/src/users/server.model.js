/**
 * Created by saubhagya on 26/4/17.
 */

var mongoose = require('mongoose');
var connection1 = require('./../config/DataSource');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String
    }
});

module.exports = connection1.model('User',userSchema);