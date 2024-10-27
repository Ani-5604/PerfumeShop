


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ganindita452:75aQLAE88CKyeORL@cluster0.iocju79.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 },
  category: { type: String },
  variants: [
    {
      id: Number,
      name: String,
      price: Number,
      image: String,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

async function addSampleProducts() {
    const products =  [
      {
        name: 'Elegant Perfume', 
        price: 49.99,
        image: '/elegant-perfume.jpg',
        description: 'A beautifully crafted elegant perfume.',
        rating: 4.5,
        category: 'Floral', // Add a category here
        variants: [{
          id: 1,
          name: 'Variant 1',
          price: 29.99,
          image: '/elegant-perfume.jpg',
        }],
      },
      {
        name: 'Air Shot Lotus',
        price: 199,
        image: '/air-shot-lotus.jpg',
        description: 'A refreshing floral scent.',
        rating: 4.7,
        category: 'Floral', // Add a category here
        variants: [],
      },
      {
        name: 'Air Shot Romance',
        price: 199,
        image: '/air-shot-romance.jpg',
        description: 'A romantic fragrance for special occasions.',
        rating: 4.8,
        category: 'Romantic', // Add a category here
        variants: [],
      },
      {
        name: 'Air Shot Oud',
        price: 199,
        image: '/air-shot-oud.jpg',
        description: 'A luxurious scent with woody notes.',
        rating: 4.9,
        category: 'Woody', // Add a category here
        variants: [],
      },
      {
        name: 'Air Shot Sweet',
        price: 199,
        image: '/air-shot-sweet.jpg',
        description: 'A sweet and playful fragrance.',
        rating: 4.6,
        category: 'Sweet', // Add a category here
        variants: [],
      },
    ];
    

    await Product.insertMany(products);
    console.log('Sample products added');
}

addSampleProducts()
    .then(() => mongoose.disconnect())
    .catch(err => console.error(err));
