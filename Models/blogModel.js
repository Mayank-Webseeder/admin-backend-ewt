const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogModel = new Schema({
    name:{type:String , required:true},
   content:{type:String , required:true},
   image:{type:String , required:true},
},{timestamps:true})

const Blog = mongoose.model('blog' , BlogModel)

module.exports = Blog;