/**
 * Created by saubhagya on 2/5/17.
 */

var buzzService = require('./buzz.service');

exports.createBuzz = function(req,res,next){            //------------for creating buzz
    var newBuzzData = req.body;
    if(req.body.buzzImage == ''){
        var newBuzzImg = '';
    }
    else{
        newBuzzImg = req.file.filename;
    }

    if(req.body.buzzContent == '' && req.body.buzzImage == ''){
        res.status(500).send('no buzz created ----buzz controller')
    }
    else{
        buzzService.createBuzz(newBuzzData,newBuzzImg,res);
    }

}

exports.deleteBuzz = function(req,res,next){         //----------for deleting buzz
    var delBuzz = req.body;
    console.log('&&&&&&&&&&&',typeof(delBuzz.userID));
    var user = req.session.user._id;
    console.log('**********',typeof(user));
    buzzService.deleteBuzz(delBuzz,res);
}

exports.createLikeDislike = function(req,res,next){   //----------for liking and disliking buzz
    console.log('req.body-----------',req.body);
    var newLike = req.body;                        //-----------data within like array.
    buzzService.createLikeDislike(newLike,res);

}

exports.createComment = function(req,res,next){        //----------for creating comment

    var newComment = req.body;
    buzzService.createComment(newComment,res);
}

exports.fetchAllBuzz = function (req,res,next){        //----------for fetching buzzes

    var offset = Number(req.query.offset);
    buzzService.fetchAllBuzz(offset,res);
}

