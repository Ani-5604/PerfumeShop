require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Review Schema
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
}, { _id: false });

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    variants: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
        }
    ],
    reviews: [reviewSchema],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Add a new product (admin)
app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(400).json({ message: 'Error saving product', error: error.message });
    }
});

// Get recommended products (you can customize this logic)
app.get('/api/products/recommended/:id', async (req, res) => {
    try {
        const products = await Product.find({ _id: { $ne: req.params.id } }).limit(3);
        res.json(products);
    } catch (error) {
        console.error('Error fetching recommended products:', error);
        res.status(500).json({ message: 'Error fetching recommended products', error: error.message });
    }
});

// POST /api/reviews
app.post('/api/reviews', async (req, res) => {
    const { userId, rating, content } = req.body;

    if (!userId || !rating || !content) {
        return res.status(400).json({ message: 'User ID, rating, and content are required.' });
    }

    try {
        // Create a new review
        const review = { userId, rating, content };
        // Optionally, save this review to a general reviews collection if you want to keep reviews separate
        const product = await Product.findOne(); // This will fetch the first product to associate the review with

        if (product) {
            product.reviews.push(review);
            await product.save();
            res.status(201).json({ message: 'Review submitted successfully', review });
        } else {
            res.status(404).json({ message: 'No products available to submit the review' });
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(400).json({ message: 'Error submitting review', error: error.message });
    }
});

// Get all reviews for all products
app.get('/api/reviews', async (req, res) => {
    try {
        const products = await Product.find().select('reviews');
        const allReviews = products.flatMap(product => product.reviews);
        res.json(allReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
