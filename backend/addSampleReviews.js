const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Ensure this path is correc
const Review = require('./models/Review'); // Adjust path if necessary
const Product = require('./models/Product');

const addSampleReviews = async () => {
  await connectDB();

  try {
    const products = await Product.find({});
    
    if (products.length === 0) {
      console.log('No products found to review');
      return;
    }

    const sampleReviews = products.map((product, index) => ({
      productId: product._id,
      userId: mongoose.Types.ObjectId(), // Replace with actual user ID from your User model
      rating: 4 + index % 2,
      comment: `Great product! ${product.name}`,
    }));

    await Review.insertMany(sampleReviews);
    console.log('Sample reviews added successfully');
  } catch (error) {
    console.error('Error adding sample reviews:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

addSampleReviews();
