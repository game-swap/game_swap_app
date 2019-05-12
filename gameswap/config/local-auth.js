const LocalStrategy = require('passport-local').Strategy
const User = require('../database/model')

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findAll({ where: { 'username' :  username }}).then( function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                req.body.requests_left = 5
                var newUser = Users.build(req.body)

                // set the user's local credentials
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save().then(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
        });
    }));
}
