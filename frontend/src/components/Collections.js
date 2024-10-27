// Collections.js
import React from 'react';
import './Collections.css';

const additionalProducts = [
  {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  }, {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  }, {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  }, {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  }, {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  }, {
    id: 5,
    name: 'Fresh Citrus Perfume',
    price: 39.99,
    image: '/images/fresh-citrus-perfume.jpg',
  },
  {
    id: 6,
    name: 'Sweet Blossom Perfume',
    price: 45.99,
    image: '/images/sweet-blossom-perfume.jpg',
  },
  {
    id: 7,
    name: 'Classic Wood Perfume',
    price: 49.99,
    image: '/images/classic-wood-perfume.jpg',
  },
  // Add more products as needed
];

const Collections = () => {
  return (
    <div className="collections-section">
      <h2 className="collections-title">More Products</h2>
      <div className="more-products">
        {additionalProducts.map((product) => (
          <div key={product.id} className="more-product-card">
            <img src={product.image} alt={product.name} className="more-product-image" />
            <h3 className="more-product-name">{product.name}</h3>
            <p className="more-product-price">${product.price.toFixed(2)}</p>
            <button className="view-more-product-btn">View Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
