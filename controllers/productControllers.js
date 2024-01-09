const Product = require('../model/productModels');
const express = require('express');
const router = express.Router();

// Create a new product
router.post('/products', async (req, res) => {
  // Implement product creation logic here
  // 1. Extract product data from the request body (req.body)
  // 2. Create a new product using Product.create()
  // 3. Handle success: Respond with a 201 status code and the created product
  // 4. Handle errors: Respond with appropriate error messages and status codes
   try {
    const { productName, price } = req.body;

    const newProduct = await Product.create({ productName, price });

    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Retrieve a product by ID
router.get('/products/:id', async (req, res) => {
  // Implement product retrieval logic here
  // 1. Extract the product ID from the request parameters (req.params.id)
  // 2. Find the product by ID using Product.findById()
  // 3. Handle success: Respond with a 200 status code and the product data
  // 4. Handle errors: Respond with appropriate error messages and status codes
   try {
    const productId = req.params.id;

    const foundProduct = await Product.findById(productId);

    if (foundProduct) {
      res.status(200).json({ message: 'Product data', product: foundProduct });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Update a product by ID
router.patch('/products/:id', async (req, res) => {
  // Implement product update logic here
  // 1. Extract the product ID from the request parameters (req.params.id)
  // 2. Extract updated product data from the request body (req.body)
  // 3. Use Product.findByIdAndUpdate() to update the product
  // 4. Handle success: Respond with a 200 status code and the updated product data
  // 5. Handle errors: Respond with appropriate error messages and status codes
   try {
    const productId = req.params.id;

    const updatedProductData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
      new: true, // Return the updated product
      runValidators: true, // Run model validations on the update
    });

    if (updatedProduct) {
      res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  // Implement product deletion logic here
  // 1. Extract the product ID from the request parameters (req.params.id)
  // 2. Use Product.findByIdAndDelete() to delete the product
  // 3. Handle success: Respond with a 200 status code and a deletion confirmation message
  // 4. Handle errors: Respond with appropriate error messages and status codes
   try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.status(200).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
