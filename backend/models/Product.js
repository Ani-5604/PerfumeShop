const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

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
      image: { type: String, required: true }
    }
  ],
  reviews: [reviewSchema],
}, { timestamps: true });

productSchema.index({ name: 1 }); // Add index to name for faster queries

module.exports = mongoose.model('Product', productSchema);
