/**
 * Created by saubhagya on 2/5/17.
 */

var Buzz = require('./buzz.model');
require('mongoose-pagination');

//==========================********   for creating buzz   **************==========================

exports.createBuzz = (newBuzzData,newBuzzImg,res, currentUser) => {
    var newBuzz1 = {
        buzzContent:newBuzzData.buzzContent,
        buzzImage:newBuzzImg,
        category:newBuzzData.category,
        postedBy:newBuzzData.postedBy,

    };
    Buzz.create(newBuzz1, function(err,data){

        if(err){
            res.send(err)
        }
        else{
            let buzzRes = JSON.parse(JSON.stringify(data));
            buzzRes.postedBy = currentUser;
            res.send(buzzRes);


        }
    })
}

//==========================********   for liking and disliking buzz   **************==========================

exports.createLikeDislike = (newLike,res) => {
    //code to manage like and dislike.............

    var postId = newLike.post_id;
    var userId = newLike.user_id;
    var like = newLike.like;
    Buzz.findOne({'_id':postId},function(err,data){
        if(err){
            res.send(err);
        }
        else{

            if(like === 'like') {

                var check = data.dislike.filter((item) => {
                    return item == userId
                })
                if (check != null) {
                    Buzz.update({_id: postId}, {$pull: {dislike: userId}}, {safe: true}, (err, data) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("data after pull", data)
                    })
                }

                if (data.like.indexOf(userId) >= 0) {
                    Buzz.find({_id: postId}, (err, data) => {
                        res.send(data)
                    })
                }
                else{
                    Buzz.update({_id: postId}, {$push: {like: userId}}, (err, data) => {
                        if (err)
                            res.send(err)
                        else
                            Buzz.find({_id: postId}, (err, data) => {
                                res.send(data)
                            })
                    })

                }
            }
            else{
                var likecheck = data.like.filter((item) => {
                    return item == userId
                })
                if (likecheck != null) {
                    Buzz.update({_id: postId}, {$pull: {like: userId}}, {safe: true}, (err, data) => {
                        if (err)
                            console.log(err)
                        else
                            console.log("data after pull", data)
                    })
                }

                if (data.dislike.indexOf(userId) >= 0) {
                    Buzz.find({_id: postId}, (err, data) => {
                        res.send(data)
                    })
                }
                else{
                    Buzz.update({_id: postId}, {$push: {dislike: userId}}, (err, data) => {
                        if (err)
                            res.send(err)
                        else
                            Buzz.find({_id: postId}, (err, data) => {
                                res.send(data)
                            })
                    })

                }
            }

        }
    })
};

//==========================********   for creating comments   **************==========================

exports.createComment = (newComment,res) => {
    var postId = newComment.postId;

    var commentObj = {
        commentData : newComment.commentData,
        commentedBy : newComment.userId
    }

    var newCommentObj = {
        postId : newComment.postId,
        commentData : newComment.commentData,
        commentedBy : newComment.userId
    }

    Buzz.findOne({'_id':postId},function(err,data){
        if(err){
            res.send(err);
        }
        else{

            Buzz.update({_id: postId},{$push : {comments: commentObj}}, (err,result) => {
                if(err){
                    res.send(err);
                }
                else{

                    res.send( newCommentObj);
                }
            })
        }
    })

}

//==========================********   for fetching buzz   **************==========================




exports.fetchAllBuzz = (offset,res) => {

    Buzz.find({}).sort({'createdAt': -1}).populate({path: 'postedBy', select: 'userName email userImage'}).limit(10).skip(offset).exec(function(err,allPost){
        if (err) {
            res.send(err);
        } else {

            res.send(allPost)
        }
    })

}

//==========================********   for deleting buzz   **************==========================

exports.deleteBuzz = (delBuzz,res) => {

    Buzz.findOne({"_id":delBuzz.postID},function(err,data){
        if(err){
            res.send(err);
        }
        else{

            if(delBuzz.userID._id == data.postedBy){
                console.log('the same user wants to delete it---',data.postedBy);
                Buzz.deleteOne({'_id':delBuzz.postID},function(err,result){
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log('deleted post--',data);
                        res.send(data);
                    }
                })
            }
        }
    })
}