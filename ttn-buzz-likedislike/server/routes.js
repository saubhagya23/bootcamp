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
//var middlewares = require('./apis/isAuth');
var multer = require('multer');

let upload = multer({dest:'buzzImageFile/'});

app.use(cookieParser());

app.use('/buzzImageFile',express.static('buzzImageFile'));


app.use(bodyParser());

app.use(session({
   /* genid: function(req) {
        return genuuid() // use UUIDs for session IDs
    },*/
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
        //return console.log('user found');
        //console.log(profile);
        if(profile._json.domain !== 'tothenew.com') {

            return done(null, null);
        }
        else{
                User.find({"googleId": profile.id}, function (err, data) {
                    if (err) {
                        console.log('error while finding user', err);
                        /*console.log('user not found');            //then we will create new user.
                         var appUser = {};
                         //console.log('<<<<<<<<<<<<<<<<<<user authenticated>>>>>>>>>>>>>>>>');
                         appUser.userName = profile.displayName;
                         appUser.googleId = profile.id;
                         //console.log('id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', profile.id);
                         appUser.email = profile.email;
                         //console.log('email', appUser.email);
                         appUser.domain = profile._json.domain;
                         appUser.gender = profile.gender;
                         appUser.userImage = profile.photos[0].value;
                         appUser.designation = 'developer';
                         appUser.role = 'admin';
                         //console.log('<<<<<<<<<<<<<<<<<<user authenticated done!!!>>>>>>>>>>>>>>>>');
                         userService.createUser(appUser, function (newUser) {
                         return done(null, newUser);

                         });*/
                    }
                    else {
                        if(data.length == 0){

                            var appUser = {};
                            //console.log('<<<<<<<<<<<<<<<<<<user authenticated>>>>>>>>>>>>>>>>');
                            appUser.userName = profile.displayName;
                            appUser.googleId = profile.id;
                            //console.log('id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', profile.id);
                            appUser.email = profile.email;
                            //console.log('email', appUser.email);
                            appUser.domain = profile._json.domain;
                            appUser.gender = profile.gender;
                            appUser.userImage = profile.photos[0].value;
                            appUser.designation = 'developer';
                            appUser.role = 'admin';
                            //console.log('<<<<<<<<<<<<<<<<<<user authenticated done!!!>>>>>>>>>>>>>>>>');
                            userService.createUser(appUser, function (newUser) {
                                return done(null, newUser);

                            });
                        }
                        else{
                            //console.log('------------data------------',data);
                            console.log('userfound');
                            userService.findUser({"email": profile.email}, function (userExist) {
                                //console.log('--------------data in call back--',userExist);
                                return done(null, userExist);

                            });
                        }

                    }
                });

            }
       // return done(null,profile);
    }
));

passport.serializeUser(function(user,done){
    console.log(user.googleId,'----------in serialize user')
    done(null,user.googleId);
});

passport.deserializeUser(function(id, done) {
    console.log(id, ' ------------in deserilaize user')
     User.findOne({googleId:id},(err,data) => {
     if(err){
        done(err)
     }else{
         console.log('data in deserialize----------',data);

        done(null,data);
     }
     });
    //done(null,id)
});

app.get('/login', passport.authenticate('google', { scope: [
    'email',
    'profile']
}));

/*
app.get('/profiles',function(req,res){
    res.send('>>>>>>>>>>>>>profiles');
    console.log('>>>>>>>>>>>>>profiles.');
});
*/

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {

        failureRedirect: 'http://localhost:3000/login'
    }), function (req, res){

        //req.session.currentUser =
        req.session.user = {_id: req.user._id, email: req.user.email};
        console.log('>>>>>>>>>>>>>', req.session);
        res.redirect('/home');

    });

app.get('/profiles',function(req,res){
    res.send('>>>>>>>>>>>>>>>>>>>>Profiles...');
});

app.get('/logout', function(req, res){
    console.log('logging out.');
    // req.logout();
    req.session.destroy();
    res.redirect('/');
});

//================================************ CLIENT SIDE ROUTES ***********=============================
function isAuthenticated(err,req,res,next){
    if(req.session.passport.user){
        console.log('authenticated user session');
        next();
    }
    else{
        console.log('user session not valid->',err);
        res.status(401).send(err);
    }
}


app.get('/userSession',
        (req,res,next) => {
            console.log('current session>>>>>>>>>>>>',req.session);
        },
        userController.getNewSession);

app.post('/buzz',
          upload.single('buzzImage'),
          isAuthenticated,
          (req,res,next) => {
                //console.log('buzz data----', req.file.filename,req.body);
                next();
          },
          buzzController.createBuzz);

app.get('/buzz',
        isAuthenticated,
        (req,res,next) => {
            console.log('buzz fetch ------------');
            next();
        },
        buzzController.fetchAllBuzz);

app.get('/user',
        isAuthenticated,
        (req,res,next) => {
            console.log(req.user,'----middleware ---in get user');
            console.log("request.session----",req.session);
            next();
        },
        userController.getUserSession);

app.post('/likeDislike',
        isAuthenticated,
        (req,res,next) => {
            console.log('data received for like dislike',req.body);
            next();
        },
        buzzController.createLikeDislike);

app.listen( 3000 ,function () {
    console.log('server at 3000');
});
app.get('/*',function(req,res){
    res.sendFile('/home/saubhagya/WebstormProjects/ttn-buzz-app1/public/index.html');
});

//=================================***********************===============================


