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

        }
        else {
            cb(data);

        }
    })

}

exports.getUserSession = function(userSessionData,res){
    console.log('session service--------',userSessionData);
    res.send(userSessionData);
}

/*
exports.getNewSession = function(userPassportData ,res){
    console.log('session service--------',userPassportData);
    res.send(userPassportData);
}
*/



