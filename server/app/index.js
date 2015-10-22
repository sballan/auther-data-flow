'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../api/users/user.model")

app.use(session({secret: 'tongiscool'}));

passport.use(
    new GoogleStrategy({
        clientID: '430671225831-2b75mtc1lcq4t0gvvso0eqh0vvivicv3.apps.googleusercontent.com',
        clientSecret: 'SMB-wwO0s29kxon_wAwk45rj',
        callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
        //the callback will pass back user profilie information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
        /*
        --- fill this part in ---
        */
        console.log('---', 'in verification callback', profile, '---');

        var userEmail = profile.emails[0].value

        User.find({email: userEmail})
        .then(function(user) {
        	console.info("Successfully found Google user")
					done(user);
        }, function(newUser) {
        	User.create({email: userEmail})
        	.then(function(user){
        		console.info("Successfully created Google user")
        		done(user);
        	})
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

//-------google authentication and login---------
//Client Id: 430671225831-2b75mtc1lcq4t0gvvso0eqh0vvivicv3.apps.googleusercontent.com
//Secret: SMB-wwO0s29kxon_wAwk45rj


app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/home',
    failureRedirect : '/'
  }));

app.use('/api', require('../api/api.router'));

app.use(function(req, res, next) {
	console.log("Hello")
	console.log(req.session.userId)
	next()
})
var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/logout', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});


app.use(require('./error.middleware'));

module.exports = app;