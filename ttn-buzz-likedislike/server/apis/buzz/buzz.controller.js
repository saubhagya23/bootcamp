/**
 * Created by saubhagya on 2/5/17.
 */

var buzzService = require('./buzz.service');

exports.createBuzz = function(req,res,next){
    var newBuzzData = req.body;
    console.log('body data of createbuzz',req.body);
    var newBuzzImg = req.file.filename;
    console.log('image in createbuzz',req.file.filename);
    if(req.body.buzzContent == ''){
        console.log('Content empty. No buzz created.');
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
        //console.log('newLike=====',newLike);
        buzzService.createLikeDislike(newLike,res);
   // }
}

exports.fetchAllBuzz = function (req,res,next){
    console.log('----fetch buzz calling')
    buzzService.fetchAllBuzz(res);
}

