const mongoose = require("mongoose");
const contactFormSchema = mongoose.Schema({
name:{
    type:String,
},
email:{
    type:String,
},
phone:{
type:String,
},
location:{
    type:String,
},
message:{
type:String,
},

});
module.exports = mongoose.model("ContactFrom", contactFormSchema );
