

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
	lastName: String
});

// Model name, schema, collection name
module.exports = mongoose.model('User', UserSchema, 'User');
