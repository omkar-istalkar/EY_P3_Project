const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Save the image path or URL
});

module.exports = mongoose.model('Dish', DishSchema);
