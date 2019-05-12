module.exports = function(server, passport) {
    server.get('/logout', function(req, res) {
        req.logout();
        res.status(200).send('et phone home');
    });

    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    
    // process the signup form
    server.post('/signup', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                return next(err)
            }
            if(!user) {
                return res.send(401, {success: false, message : 'authentication failed'})
            }
            req.login(user, (err) => {
                if(err) {
                    return next(err)
                } return res.send({success: true, message : 'authentication succeeded'})
            })
        })
        (req, res, next)
    });

}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(200).send('et phone home');
}

// {
//     successRedirect : '/profile', // redirect to the secure profile section
//     failureRedirect : '/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }