var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
var db = mongoose.connection;
autoIncrement.initialize(db);

var questionSchema = new Schema({
	id: Number,
	title: String,
	text: String,
	tags: [String],
	author: String,
	answers: [Number],
	votes: Number,
	views: Number,
	numberOfAnswers: Number,
	timeStamp: String
});



questionSchema.plugin(autoIncrement.plugin, 'Question');
var questions = mongoose.model('Question',questionSchema,'questions');

questions.find({}, function(err, data) { console.log(err, data, data.length); });
module.exports = questions;