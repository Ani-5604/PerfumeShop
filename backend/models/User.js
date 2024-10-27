const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  image: String,
  variants: [
    {
      name: String,
      price: Number,
      image: String,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Product, Review };
