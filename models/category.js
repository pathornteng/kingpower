"use strict"
//Require Mongoose
const Mongoose = require('mongoose');

const CategorySchema = new Mongoose.Schema({
    Id: { type: Mongoose.Schema.ObjectId },
    name: { type: String },
    url: { type: String },
});

module.exports = Mongoose.model('Category', ProductSchema); 
