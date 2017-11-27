var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blog_schema = new Schema({
    title : String,
    body: String,
    URL: String,
    author : String,
    secretKey : String
},{collection : 'blog_schema'},{versionKey:false});


var blog_schema = module.exports = mongoose.model('blog_schema', blog_schema);

module.exports.getblog = function(callback, limit){
    blog_schema.find(callback).limit(limit);
};