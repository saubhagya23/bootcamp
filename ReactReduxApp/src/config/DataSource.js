/**
 * Created by saubhagya on 26/4/17.
 */

var mongoose = require('mongoose');

module.exports = connection = mongoose.createConnection('mongodb://localhost/UsersRedux');

connection.on('open',function(){
        console.log('connection to database established.');
    });

connection.on('error',function(){
        console.log('connection failed...error occured.');
    });

