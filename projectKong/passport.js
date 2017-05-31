/**
 * Created by Kong on 5/30/2017.
 */

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
    // 601784211930-c6mbrnma33rqvps1q75ghvgav81ogp9n.apps.googleusercontent.com
        clientSecret: GOOGLE_CLIENT_SECRET,
    // PrFwDzcC5emrK_BayNovhRaC
        callbackURL: "herokuapp"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });