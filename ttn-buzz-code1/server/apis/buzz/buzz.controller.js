/**
 * Created by saubhagya on 2/5/17.
 */

var buzzService = require('./buzz.service');

exports.createBuzz = function(req,res,next){
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

exports.createLikeDislike = function(req,res,next){
    console.log('req.body-----------',req.body);
    var newLike = req.body;//data within like array.
    /*if(!(req.body.post_id) || !(req.body.like)){
        console.log('no content.No like dislike either.');
        res.status(500).send('no likes or dislikes ----buzz controller');
    }
    else{*/

        buzzService.createLikeDislike(newLike,res);
   // }
}

exports.createComment = function(req,res,next){

    var newComment = req.body;
    buzzService.createComment(newComment,res);
}

exports.fetchAllBuzz = function (req,res,next){

    var offset = Number(req.query.offset);
    buzzService.fetchAllBuzz(offset,res);
}

