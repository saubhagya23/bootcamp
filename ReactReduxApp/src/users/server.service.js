/**
 * Created by saubhagya on 26/4/17.
 */

var User = require('./server.model');


exports.createUser = function(userInfo1,res){
    console.log('>>>>>>>>>>>data got inside createUser', userInfo1);
    User.create(userInfo1, function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);//it takes object and not string...
        }
    })
}

exports.findUser = function(userInfo2,res) {
    User.find({"name":userInfo2}, function (err, data) {
        if (err) {
            res.send({error: "Error occured while getting data....",err});
        }
        else {
            console.log('data got in services................');
            res.send(data);
        }
    })

}


exports.getUser = function(res) {
    User.find({}, function (err, data) {
        if (err) {
            res.send({error: "Error occured while getting data....",err});
        }
        else {
            console.log('data got in services................',data);
            res.send(data);
        }
    })
}


exports.deleteUser = function(userInfo3,res) {
    User.remove({"name":userInfo3.UserName}, function (err, data) {
        if (err) {
            console.log('>>>>>>>>>>>>',err);
            res.send({error: "Error occured while getting data....",err});
        }
        else {
            console.log(data,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            User.find((err,NewUserData) => {
                if(err)
                {

                }
                else
                {
                    res.send(NewUserData);
                }
            })

        }
    })

}

exports.editUser = function(userInfo3,res) {
    User.update({"name":userInfo3.UserName} ,{email:userInfo3.email}, {upsert:true}, function (err, data) {
        if (err) {
            console.log('>>>>>>>>>>>>',err);
            res.send({error: "Error occured while getting data....",err});
        }
        else {
            console.log(data,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            User.find((err,NewUserData) => {
                if(err)
                {

                }
                else
                {
                    res.send(NewUserData);
                }
            })

        }
    })

}