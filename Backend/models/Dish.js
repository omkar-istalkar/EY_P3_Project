const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    hotelEmail: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Dish', DishSchema);
