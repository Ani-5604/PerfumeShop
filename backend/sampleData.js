const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure this path is correct

const products = [
  {
    name: 'Air Shot Lotus',
    price: 59.99,
    imageUrl: '/images/air-shot-lotus.jpg',
    description: 'A fresh and floral scent that uplifts the spirit.',
    rating: 4.5,
    variants: [
      { name: 'Air Shot Lotus 50ml', price: 39.99, image: '/images/air-shot-lotus-50ml.jpg' },
      { name: 'Air Shot Lotus 100ml', price: 59.99, image: '/images/air-shot-lotus-100ml.jpg' },
    ]
  },
  {
    name: 'Air Shot Oud',
    price: 89.99,
    imageUrl: '/images/air-shot-oud.jpg',
    description: 'A rich and captivating fragrance with oud notes.',
    rating: 4.8,
    variants: [
      { name: 'Air Shot Oud 50ml', price: 59.99, image: '/images/air-shot-oud.jpg' },
      { name: 'Air Shot Oud 100ml', price: 89.99, image: '/images/air-shot-oud-100ml.jpg' },
    ]
  }, {
    name: 'sweet-blossom-perfume',
    price: 59.99,
    imageUrl: '/images/sweet-blossom-perfume.jpg',
    description: 'A fresh and floral scent that uplifts the spirit.',
    rating: 4.5,
    variants: [
      { name: 'Air Shot Lotus 50ml', price: 39.99, image: '/images/sweet-blossom-perfume.jpg' },
      { name: 'Air Shot Lotus 100ml', price: 59.99, image: '/images/sweet-blossom-perfume.jpg' },
    ]
  },
  {
    name: 'elegant-perfume-50ml',
    price: 89.99,
    imageUrl: '/images/elegant-perfume-50ml.jpg',
    description: 'A rich and captivating fragrance with oud notes.',
    rating: 4.8,
    variants: [
      { name: 'Air Shot Oud 50ml', price: 59.99, image: '/images/elegant-perfume-50ml.jpg' },
      { name: 'Air Shot Oud 100ml', price: 89.99, image: '/images/elegant-perfume-50ml.jpg' },
    ]
  },
  
  
  // Add more products as needed...
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products); // Insert sample data
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Connect to MongoDB and import data
mongoose.connect('mongodb+srv://ganindita452:75aQLAE88CKyeORL@cluster0.iocju79.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  importData();
})
.catch(err => console.error('MongoDB connection error:', err));
