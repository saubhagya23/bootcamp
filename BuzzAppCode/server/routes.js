/**
 * Created by saubhagya on 2/5/17.
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = '864026173072-np7udm4mkgi47dh7l12mdh4bq35tm6cr.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'C37SU96kLSbsdM9L1HW8L6nX';

var webpack = require('webpack'); //for executing both client and server using same port.
var webpackDevMiddleware = require('webpack-dev-middleware'); //for executing both client and server using same port.

var webConfig = require('./../webpack.config');

var User = require('./apis/users/users.model');
var userService = require('./apis/users/users.service');
var userController = require('./apis/users/users.controller');
var buzzController = require('./apis/buzz/buzz.controller');
var complaintController = require('./apis/complaints/complaints.controller');

var multer = require('multer');

let upload = multer({dest:'buzzImageFile/'});
let compUpload = multer({dest:'compImageFile/'});

app.use(cookieParser());

app.use('/buzzImageFile',express.static('buzzImageFile'));
app.use('/compImageFile',express.static('compImageFile'));


app.use(bodyParser());

app.use(session({
    secret: 'abcd1234',
    resave: true,
    saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());

const compiledConfig = webpack(webConfig); //for executing both client and server using same port.

app.use(webpackDevMiddleware(compiledConfig,{ //for executing both client and server using same port.
    hot:true,
    filename: 'bundle.js',
    path: '/',
    stats: {
        color:true
    },
    historyApiFallback:false
}));

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",

    },
    function(accessToken, refreshToken, profile, done) {

        if(profile._json.domain !== 'tothenew.com') {

            return done(null, null);
        }
        else{
                User.find({"googleId": profile.id}, function (err, data) {
                    if (err) {
                        return done(err);

                    }
                    else {
                        if(data.length == 0){

                            var appUser = {};

                            appUser.userName = profile.displayName;
                            appUser.googleId = profile.id;

                            appUser.email = profile.email;

                            appUser.domain = profile._json.domain;
                            appUser.gender = profile.gender;
                            appUser.userImage = profile.photos[0].value;
                            appUser.designation = 'developer';
                            appUser.role = 'user';

                            userService.createUser(appUser, function (newUser) {
                                return done(null, newUser);

                            });
                        }
                        else{

                            console.log('userfound');
                            userService.findUser({"email": profile.email}, function (userExist) {

                                return done(null, userExist);

                            });
                        }

                    }
                });

            }

    }
));

passport.serializeUser(function(user,done){
    done(null,user.googleId);
});

passport.deserializeUser(function(id, done) {
     User.findOne({googleId:id},(err,data) => {
     if(err){
        done(err)
     }else{
        done(null,data);
     }
     });

});

app.get('/login', passport.authenticate('google', { scope: [
    'email',
    'profile']
}));


app.get( '/auth/google/callback',
    passport.authenticate( 'google', {

        failureRedirect: 'http://localhost:3000/login'
    }), function (req, res){

        req.session.user = {
            _id: req.user._id,
            email: req.user.email,
            role: req.user.role,
            userImage:req.user.userImage,
            userName:req.user.userName
        };
        res.redirect('/home');

    });

app.get('/profiles',function(req,res){
    res.send('>>>>>>>>>>>>>>>>>>>>Profiles...');
});

app.get('/logout', function(req, res){
    console.log('logging out.');
    req.session.destroy();
    res.redirect('/');
});

app.get('/complaint',function(req,res){
    res.redirect('/complaints');
});

app.get('/resolve',function(req,res){
    res.redirect('/resolved');
})

//================================************ CLIENT SIDE ROUTES ***********=============================
function isAuthenticated(err,req,res,next){
    if(req.session.passport.user){
        next();
    }
    else{
        res.status(401).send(err);
    }
}

app.get('/user',
    isAuthenticated,
    userController.getUserSession);

app.get('/buzz',
    isAuthenticated,
    buzzController.fetchAllBuzz);

app.post('/buzz',
          upload.single('buzzImage'),
          isAuthenticated,
          buzzController.createBuzz);


app.post('/likeDislike',
        isAuthenticated,
        buzzController.createLikeDislike);

app.post('/comment',isAuthenticated,buzzController.createComment);

app.post('/deleteBuzz',isAuthenticated
    ,buzzController.deleteBuzz);

app.get('/createComplaint',
    isAuthenticated,
    complaintController.fetchComplaints);

app.post('/createComplaint',
    compUpload.single('compImage'),
    isAuthenticated,
    complaintController.createComplaint);

app.post('/complaintStatus',
    isAuthenticated,
    complaintController.complaintStatus);

app.get('/resolveComplaint',
    isAuthenticated,
    complaintController.resolvedComplaints);

app.get('/deleteComplaint',
    isAuthenticated,
    complaintController.deleteComplaints);

app.listen( 3000 ,function () {
    console.log('server at 3000');
});

app.get('/*',function(req,res){
    res.sendFile('/home/saubhagya/WebstormProjects/ttn-buzz-app1/public/index.html');
});

//=================================***********************===============================


