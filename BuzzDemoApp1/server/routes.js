/**
 * Created by saubhagya on 2/5/17.
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sessions = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

//require('./config/config.googleAuth');

var GOOGLE_CLIENT_ID = '864026173072-np7udm4mkgi47dh7l12mdh4bq35tm6cr.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'C37SU96kLSbsdM9L1HW8L6nX';

var webpack = require('webpack'); //for executing both client and server using same port.
var webpackDevMiddleware = require('webpack-dev-middleware'); //for executing both client and server using same port.

var webConfig = require('./../webpack.config');

var User = require('./apis/users/users.model');
var userService = require('./apis/users/users.service');
var userController = require('./apis/users/users.controller');
var buzzController = require('./apis/buzz/buzz.controller');

app.use(bodyParser());

app.use(sessions({
   /* genid: function(req) {
        return genuuid() // use UUIDs for session IDs
    },*/
    secret:'abcd1234'
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
    historyApiFallback:true
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
                            console.log('<<<<<<<<<<<<<<<<<<user authenticated>>>>>>>>>>>>>>>>');
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

            /*console.log('profile.mail--------',profile.email);
            console.log('--------type of mail------',typeof profile.email);*/
           /* userService.findUser({"email":profile.email}, function (value) {
                console.log('--------------data in call back--',value);
                return done(null, value);
            })*/


            /*}
            else {
                if(profile._json.domain === 'tothenew.com'){
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
                    userService.createUser(appUser, function () {
                        return done(null, appUser);

                    });
                }*/

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
        successRedirect: 'http://localhost:3000/home',
        failureRedirect: 'http://localhost:3000/login'
    }));

app.get('/profiles',function(req,res){
    res.send('>>>>>>>>>>>>>>>>>>>>Profiles...');
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//================================************ CLIENT SIDE ROUTES ***********=============================

app.post('/buzz',buzzController.createBuzz);

app.get('/buzz',(req,res,next) => { console.log('buzz fetch ------------'); next();}, buzzController.fetchAllBuzz);

app.get('/user',(req,res,next)=> { console.log(req.user,'----middleware ---in get user');console.log("request.session----",req.session.passport);next();},userController.getUserSession);

app.listen( 3000 ,function () {
    console.log('server at 3000');
});
app.get('/*',function(req,res){
    res.sendFile('/home/saubhagya/WebstormProjects/ttn-buzz-app1/public/index.html');
});

//=================================***********************===============================
/*var express = require('express');
//var user_controller = require('./apis/users/users.controller');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var session = require('express-session');
var bodyParser = require('body-parser');
import {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} from './config/config.googleAuth'
var app = express();

var PORT = 9000;
app.use(bodyParser());

/!*app.get('/auth/google',
passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });*!/

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:9000/home"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

app.get('/main ',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/home',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });


passport.serializeUser(function(user,done){
    done(null,user['_id']);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(null, user);
    });
});

http.createServer(app).listen(PORT);
*/

