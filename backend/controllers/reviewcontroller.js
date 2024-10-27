const Review = require('../models/Review');

// Get reviews for a product
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.id });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new review
exports.createReview = async (req, res) => {
    const review = new Review({ ...req.body, productId: req.params.id });
    try {
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
