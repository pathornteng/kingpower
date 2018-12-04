"use strict"
//Require Mongoose
const Mongoose = require('mongoose');

const ProductSchema = new Mongoose.Schema({
    Id: { type: Mongoose.Schema.ObjectId },
    sku: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: String },
    image: { type: String },
    category: { type: String },
    url: { type: String },
});

module.exports = Mongoose.model('Product', ProductSchema); 
