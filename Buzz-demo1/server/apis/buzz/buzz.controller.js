/**
 * Created by saubhagya on 2/5/17.
 */

var buzzService = require('./buzz.service');

exports.createBuzz = function(req,res,next){
    var newBuzz = req.body
    console.log('body data of createbuzz',req.body);
    buzzService.createBuzz(newBuzz,res);
}

exports.fetchAllBuzz = function (req,res,next){
    console.log('----fetch buxzz calling')
    buzzService.fetchAllBuzz(res);
}

