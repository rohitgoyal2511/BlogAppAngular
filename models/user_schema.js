var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    username: String,
    password: String,
    secretKey: String,
    likeBlog : [String],
    author : String
},{collection : 'user_schema'},{versionKey:false});


var user_schema = module.exports = mongoose.model('user_schema', user_schema);

module.exports.getUsers = function(callback, limit){
    user_schema.find(callback).limit(limit);
}