const express = require('express');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Add a new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`; // Image path

    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products for the home page
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a single product with its reviews
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const reviews = await Review.find({ productId: req.params.productId });

    res.json({ product, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
