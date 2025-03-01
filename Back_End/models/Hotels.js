const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  h_name: { type: String, required: true },
  h_image : {type:String,require:true}  
});

module.exports = mongoose.model('Hotel', HotelSchema);
