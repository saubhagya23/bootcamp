/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

/*
module.exports = connection = mongoose.createConnection('mongodb://localhost/buzzDemo1');

connection.on('open',function(){
    console.log('connection to buzzDemo1 database established.');
});

connection.on('error',function(){
    console.log('connection failed to buzzDemo1...error occured.');
});*/


mongoose.connect('mongodb://localhost/buzzDemo1', {});
mongoose.connection.on('open', function(){
    console.log('connection to buzzDemo1 database established.');
});
mongoose.connection.on('error', function(err) {
    console.error('[Mongoose][connection] error: ' + err);
    process.exit(-1);
});