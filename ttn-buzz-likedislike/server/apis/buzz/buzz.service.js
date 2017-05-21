/**
 * Created by saubhagya on 2/5/17.
 */

var Buzz = require('./buzz.model');

exports.createBuzz = (newBuzzData,newBuzzImg,res) => {
    //console.log('buzz created',newBuzz);
    var newBuzz1 = {
        buzzContent:newBuzzData.buzzContent,
        buzzImage:newBuzzImg,
        category:newBuzzData.category,
        postedBy:newBuzzData.postedBy
    };
    Buzz.create(newBuzz1, function(err,data){
        console.log('----------',err, data);
        if(err){
            console.log('error occurred while creating buzz>>>>>>>',err)
        }
        else{
            console.log('buzz data is>>>>>>>>>>',data);
            Buzz.find({},(err,allPost) => {
                if(err){
                    res.send(err);
                }else{
                    console.log('all post ',allPost);
                    res.send(allPost);
                }
            })/*.populate('postedBy').exec(function(error, posts) {
                console.log('posts are---------',posts, null, "\t");
            })*/

        }
    })
}

exports.createLikeDislike = (newLike,res) => {
    //code to manage like and dislike.............
    console.log('newlike in service=======',newLike)
    var postId = newLike.post_id;
    var userId = newLike.user_id;
    var like = newLike.like;
    Buzz.findOne({'_id':postId},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            console.log('buzz with like found',data);
            if(like === 'like') {
                console.log('++++++++++++',data.dislike, Array.isArray(data.dislike));
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


//...----------------------------------------========================================---------------




exports.fetchAllBuzz = (res) => {
    console.log('all buzzes ',res);
}


