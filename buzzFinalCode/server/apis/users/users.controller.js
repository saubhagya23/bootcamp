/**
 * Created by saubhagya on 2/5/17.
 */


var userService = require('./users.service');

exports.getUserSession = function(req,res,next){
    var userSessionData = req.user;

    userService.getUserSession(userSessionData,res);
}


