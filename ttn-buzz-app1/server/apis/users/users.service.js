/**
 * Created by saubhagya on 2/5/17.
 */

var User = require('./users.model');

exports.createUser = (profileUser1, cb) => {
    console.log("inside service>>>>>>>>>>>>>>>>",profileUser1);
    var user = new User(profileUser1);
    user.save( function(err,data){
        console.log('----------',err, data);
        if(err){
            console.log('error occurred>>>>>>>',err);


        }
        else{
            console.log('user data is>>>>>>>>>>s',data);

        }
        cb();
    });
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

