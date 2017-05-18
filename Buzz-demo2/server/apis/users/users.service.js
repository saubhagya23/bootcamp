/**
 * Created by saubhagya on 2/5/17.
 */

var User = require('./users.model');

exports.createUser = (profileUser1,cb) => {
    console.log("inside service>>>>>>>>>>>>>>>>",profileUser1);
    var user = new User(profileUser1);
    User.create(user, function(err,data){
        console.log('----------',err, data);
        if(err){
            console.log('error occurred>>>>>>>',err);


        }
        else{
            console.log('user data is>>>>>>>>>>',data);
            cb(data);
        }
    });
}

exports.findUser = function(userEmail,cb) {
    console.log('---------------------email in findUser',userEmail.email);
    User.findOne({"email":userEmail.email}, function (err, data) {
        if (err) {
            //console.log("Error occured while getting data....",err);
        }
        else {
            cb(data);
           // console.log("user found::", data);
        }
    })

}

exports.getUserSession = function(userSessionData,res){
    console.log('session service--------',userSessionData);
    res.send(userSessionData);
}

exports.getNewSession = function(userPassportData ,res){
    console.log('session service--------',userPassportData);
    res.send(userPassportData);
}

/*
exports.updateUser = function(userName1,res){
    console.log(userName1,"fhdhrh>>>>>>>>>>>>>>>>>>")
    User.update({userName:userName1}, {userName:"Smriti"} ,function(err,data){
        if(err){
            res.send({error:"error during updation",error:err})
        }
        else{
            //console.log("updation complete...",user.data)
            res.send({message:"updated username",user:data})
        }
        console.log('callback>>>>>>>>>>>>>>>>>>');

    })
}


exports.getUser = function(userData1,res) {
    User.find({"userName":userData1}, function (err, data) {
        if (err) {
            res.send({error: "Error occured while getting data....", error: err});
        }
        else {
            res.send({message: "user found::", user: data})
        }
    })

}

exports.getUserList = function(res) {
    User.find({}, function (err, data) {
        if (err) {
            res.send({error: "Error occured while getting data....", error: err});
        }
        else {
            res.send({message: "user found::", user: data})
        }
    })

}
*/

