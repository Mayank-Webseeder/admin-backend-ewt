const mongoose = require("mongoose");
const contactPageSchema = mongoose.Schema({
email:{
    type:String
},
phone:{
type:Number,
},
location:{
    type:String,
},
});
module.exports = mongoose.model("ContactPage", contactPageSchema );