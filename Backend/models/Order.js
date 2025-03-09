const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, 
  hotelEmail: { type: String, required: true },
  dishName: { type: String, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now } 
},{timestamps:true});

module.exports = mongoose.model("Order", OrderSchema);
