var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Question = require('../config/questions.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sprinklrExchange' });
});

router.get('/questionanswer', function(req, res, next) {
  res.render('questionanswer', { title: 'sprinklrExchange' });
});

router.get('/ask', function(req, res, next) {
    if(isLoggedIn(req,res,next)){
        res.render('index2', { title: 'sprinklrExchange' });
    }
    else{
        res.redirect('/');
    }
});

router.get('/profile', function(req, res, next) {
    if(isLoggedIn(req,res,next)){
        res.render('profile.ejs', { user: req.user });
    }
    else{
        res.redirect('/');
    }
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

router.post('/questions', function(req,res){
    var question = req.body;
    var sid = req.seesionID;
    var user = req.user;
    question.author = user.google.name;
    console.log(question);
    Question.createQuestion(question);
    res.redirect('/');
});
// router.get('/users', function(req,res){
//     mongoose.model('user',userSchema).find(function(err,users){
//         res.send(users);
//     });
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return true;
    }
    return false;
}

module.exports = router;
