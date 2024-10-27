const express = require('express');
const { getProducts, getProductById, createProduct, getRecommendedProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // Only allow admins to create products
router.get('/recommended/:id', getRecommendedProducts);

module.exports = router;
