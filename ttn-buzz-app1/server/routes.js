/**
 * Created by saubhagya on 2/5/17.
 */


//=============================***********************=============================

var express = require('express');
var app = express();
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

passport.serializeUser(function(user,done){
   return done(null,user);
});

passport.deserializeUser(function(id, done) {
    done(null);
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",

    },
    function(accessToken, refreshToken, profile, done) {
        //return console.log('user found');
        console.log(profile);
        if(profile._json.domain === 'tothenew.com')
        {
            var user1 ={};
            console.log('<<<<<<<<<<<<<<<<<<user authenticated>>>>>>>>>>>>>>>>');
            user1.userName = profile.displayName;
            user1.email = profile.email;
            console.log('email',user1.email);

            user1.designation = 'developer';
            user1.role = 'admin';
            console.log('<<<<<<<<<<<<<<<<<<user authenticated done!!!>>>>>>>>>>>>>>>>');
            userService.createUser(user1, function(){
                return done(null,user1);
            });





        }
        return done(null,profile);
    }
));


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
        successRedirect: '/profiles',
        failureRedirect: 'http://localhost:3000/login'
    }));



app.get('/profiles',function(req,res){
    //console.log('>>>>>>>>>>>>>>>>>>>>Profiles...');
    res.send('>>>>>>>>>>>>>>>>>>>>Profiles...');
});


app.listen( 3000 ,function () {
    console.log('server at 3000');
});



