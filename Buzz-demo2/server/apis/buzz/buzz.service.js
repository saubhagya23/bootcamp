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

/*exports.createLikeDislike = (newLike,newDislike,res) => {
    //code to manage like and dislike.............
}*/

exports.fetchAllBuzz = (res) => {
    console.log('all buzzes ',res);
}

/*exports.getUser = function(res) {
    User.find({}, function (err, data) {
        if (err) {
            res.send({error: "Error occured while getting data....",err});
        }
        else {
            console.log('data got in services................',data);
            res.send(data);
        }
    })
}*/
