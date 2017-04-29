/**
 * Created by saubhagya on 26/4/17.
 */

var userServices = require('./server.service');

exports.createUser = function(req,res,next){
    var userInfo1 = req.body.data;
    console.log("userData",userInfo1);
    userServices.createUser(userInfo1,res);
};

exports.findUser = function(req,res,next){
    var userInfo2 = req.params.name;
    console.log(userInfo2)
    userServices.findUser(userInfo2,res);
};

exports.getUser = function (req,res,next) {
    userServices.getUser(res)
}

exports.deleteUser = function(req,res,next){
    var userInfo3 = req.body;
    console.log("userData",userInfo3);
    userServices.deleteUser(userInfo3,res);
};

exports.editUser = function(req,res,next){
    var userInfo4 = req.body;
    console.log("userData",userInfo4);
    userServices.editUser(userInfo4,res);
};