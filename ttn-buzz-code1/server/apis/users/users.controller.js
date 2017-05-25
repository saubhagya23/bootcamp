/**
 * Created by saubhagya on 2/5/17.
 */


var userService = require('./users.service');

exports.getUserSession = function(req,res,next){
    var userSessionData = req.user;
    console.log("data in session-------",userSessionData);
    userService.getUserSession(userSessionData,res);
}

/*exports.getNewSession = function(req,res,next){

    var userPassportData = req.session.passport.user;
    console.log("data in session-------",userPassportData);
    userService.getNewSession(userPassportData,res);
}*/


