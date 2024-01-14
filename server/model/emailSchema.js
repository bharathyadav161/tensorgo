const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
    to: String,
    subject: String,
    body: String,
  });
  
  var Email = mongoose.model('Email', emailSchema);
  module.exports = Email;