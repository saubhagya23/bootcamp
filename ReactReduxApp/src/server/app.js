/**
 * Created by saubhagya on 26/4/17.
 */

var bodyParser = require('body-parser');
var express = require('express');
var controller = require('./../users/server.controller');

var app = express();
app.use(bodyParser());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.post('/Users/',controller.createUser);

app.get('/Users',controller.getUser);

app.delete('/Users',controller.deleteUser);

app.put('/Users',controller.editUser);

app.listen(3000,function(){
    console.log('localhost listening to port 3000');
});