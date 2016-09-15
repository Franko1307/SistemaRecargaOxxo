
var LocalStrategy   = require('passport-local').Strategy;
var User       	  	= require('../models/user.js');
var bCrypt          = require('bcrypt-nodejs');

//Chequeo si la contra está chida

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
//Crea una contra chida
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

    // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {

      // find a user whose email is the same as the forms email
      User.find({}, function(err, users) {
          var userMap = {};

          users.forEach(function(user) {
            //console.log(user);
          });

        });

      // we are checking to see if the user trying to login already exists
      User.findOne({ 'username' :  username }, function(err, user) {
          // if there are any errors, return the error before anything else
          if (err)
              return done(err);

          // if no user is found, return the message
          if (!user)
              return done(null, false, { message: 'No user found' } );
          console.log(user);
          // if the user is found but the password is wrong
          if (!isValidPassword(user,password)) {
            return done(null, false, { message: 'Invalid password' } );
          }
          console.log('TODO BIEN');
          // all is well, return successful user
          return done(null, user);
      });

  }));
}
