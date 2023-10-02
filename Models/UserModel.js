const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {type:String , required:true},
    email:{type:String , unique:true},
    password:{type:String , required:true}
})

const User = mongoose.model('users', UserModel)

module.exports = User;