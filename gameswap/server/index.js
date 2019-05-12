const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const router = require('./router');
const authrouter = require('./authrouter');
const port = 3000;

server.use(morgan('dev'));
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', router);

server.use(express.static(path.join(__dirname, '/../client/dist')));

server.listen(port, () => console.log(`connected at ${port}`));

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('../config/local-auth.js')

server.use(session({ secret: 'mynameisjeff' })); // session secret
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
server.use(flash()); // use connect-flash for flash messages stored in session
server.use(cookieParser());

authrouter(server, passport)
config(passport)


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

//   server.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });   