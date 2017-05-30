/**
 * Created by saubhagya on 2/5/17.
 */

var User = require('./users.model');

//==========================********   for creating users   **************==========================

exports.createUser = (profileUser1,cb) => {

    var user = new User(profileUser1);
    User.create(user, function(err,data){
        if(err){
            console.log('error occurred while crerating user',err);
        }
        else{
            cb(data);
        }
    });
}

//==========================********   for fetching users  **************==========================

exports.findUser = function(userEmail,cb) {

    User.findOne({"email":userEmail.email}, function (err, data) {
        if (err) {
            console.log('user not found---',err);
        }
        else {
            cb(data);

        }
    })

}

//==========================********   for getting user session   **************==========================

exports.getUserSession = function(userSessionData,res){

    res.send(userSessionData);
}



