// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import 'font-awesome/css/font-awesome.min.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/product/${product._id}`); // Navigate to product page using MongoDB's _id
  };

  return (
    <div className="product-card" onClick={viewDetails}>
      <div className="product-image-container">
        <img
          src={`http://localhost:5000${product.image}`} // Ensure correct server path
          alt={product.name}
          className="product-image"
        />
        <div className="action-icons">
          <button className="wishlist-icon" aria-label="Add to Wishlist">
            <i className="fa fa-heart"></i>
          </button>
          <button className="search-icon" aria-label="View Details">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Rs. {product.price}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
