const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  property1: mongoose.Schema.Types.Mixed,
  property2: mongoose.Schema.Types.Mixed,
  
});

const aboutSchema = new mongoose.Schema({
  title: String,
  content: contentSchema, 
  
});

module.exports = mongoose.model('About', aboutSchema);
