const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

let app = express();

// ALWAYS IN THIS ORDER///////////////////////////////////////////////////////////
app.use(session({
    secret: 'lajfeoiwjefa;lsjfkladjghoeiwjola',
    saveUninitialized: false,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
// ////////////////////////////////////////////////////////////////////////////////

passport.use(new Auth0Strategy({
  domain: 'jdpabst.auth0.com',
  clientID: 'uclJZ7r51Ky0pxDSyWWK4DX3beSHt4U6',
  clientSecret: 'TM6e7oe7BRZT1heRw-reAJ-gZU-diqx1VyzqYS_xlO76e2WkDDfLm74I1uoS9fQ6',
//   callbackURL must match the app.get below //
  callbackURL: '/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // normally, we will find the user in the database here then invoke done... today we are just learning how to set it up.
  return done(null, profile);
}));


app.get('/auth', passport.authenticate('auth0')) //START
// matches callbackURL above //
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/home', failureRedirect: '/failedLogin'}), function(req, res){           //AUTH0 RETURNS HERE
        res.status(200).send(req.user);
    });
//  user = whatever came in as the profile above //
passport.serializeUser(function(user, done){
       return done(null, user); //node session will remember this value
    });
passport.deserializeUser(function(obj, done) {
       return done(null, obj);
    });

app.get('/me', function(req, res){
    res.send(req.user) //user is a keyword that passport session will add... //
    
})

app.listen(3000, console.log('listening on port 3000'))