/**
 * Created by saubhagya on 2/5/17.
 */

var Buzz = require('./buzz.model');

exports.createBuzz = (newBuzz,res) => {
    //console.log('buzz created',newBuzz);
    /*var newBuzz1 = {
        buzzStatus:newBuzz,
        buzzImage:image
    };*/
    Buzz.create(newBuzz, function(err,data){
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
            })

        }
    });
}

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
