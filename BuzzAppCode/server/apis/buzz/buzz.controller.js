/**
 * Created by saubhagya on 2/5/17.
 */

var buzzService = require('./buzz.service');

exports.createBuzz = function(req,res,next){            //------------for creating buzz
    var newBuzzData = req.body;
    var data = {
        _id: req.session.user._id,
        userName:req.session.user.userName,
        userImage:req.session.user.userImage
    };
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
        buzzService.createBuzz(newBuzzData,newBuzzImg,res,data);
    }

}

exports.deleteBuzz = function(req,res,next){         //----------for deleting buzz
    var delBuzz = req.body;
    buzzService.deleteBuzz(delBuzz,res);
}

exports.createLikeDislike = function(req,res,next){   //----------for liking and disliking buzz
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

