var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	google: {
 		id: String,
 		token: String,
 		name: String,
 		email: String,
 		questionsAsked: [Number],
 		questionsAnswered: [Number]
 	}
});
var users = mongoose.model('User',userSchema,'users');
users.find({}, function(err, data) { console.log(err, data, data.length); });
module.exports = users;