var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sprinklrExchange' });
});

router.get('/ask', function(req, res, next) {
  res.render('index2', { title: 'sprinklrExchange' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile.ejs', { user: req.user });
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
router.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
        }));

router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }

    // console.log("hello world");
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
