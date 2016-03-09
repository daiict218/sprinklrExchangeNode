var Question = require('../models/questions');
var configAuth = require('./auth');
exports.createQuestion = function(question) {
    var newQuestion = new Question();
    newQuestion.text = question.text;
    newQuestion.title = question.title;
    newQuestion.tags = question.tags;
    newQuestion.author = question.author;
    newQuestion.answers = [];
    newQuestion.votes = 0;
    newQuestion.views = 0;
    newQuestion.numberOfAnswers = 0;
    newQuestion.timestamp = '';  
    newQuestion.save(function(err){
        if(err){
            console.log(err);
            throw err;
        }
    });
};

