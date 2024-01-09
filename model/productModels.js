const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  // Implement the product schema fields here as
  // productName as String and price as Number
   productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});


// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
