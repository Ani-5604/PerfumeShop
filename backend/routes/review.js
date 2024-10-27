// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Adjust path according to your structure
const Product = require('../models/Product'); // Adjust path according to your structure

// POST /api/products/:productId/reviews
router.post('/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        // Validate that the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const review = new Review({ productId, userId, rating, comment });
        await review.save();

        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error submitting review', error: error.message });
    }
});

module.exports = router;
