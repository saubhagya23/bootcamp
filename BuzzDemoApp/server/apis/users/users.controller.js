/**
 * Created by saubhagya on 2/5/17.
 */


var userService = require('./users.service');

exports.getUserSession = function(req,res,next){
    var userSessionData = req.body;
    console.log("data in session-------",userSessionData);
    userService.getUserSession(userSessionData,res);
}

/*
exports.createUser = function(req,res,next){
    var userData = req.body.data;
    console.log("userData",userData);
    userService.createUser(userData,res);
}

exports.getUser = function(req,res,next){
    var userData1 = req.params.userName;
    userService.getUser(userData1,res);
}

exports.getUserList = function(req,res,next){
    userService.getUser(res);
}

*/
