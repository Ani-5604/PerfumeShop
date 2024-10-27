// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import '../App.css';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data); // Debug log
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="homepage">
   
      <Banner />
      <section className="products-section">
        <h2>Featured Perfumes</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => handleProductClick(product._id)} // Navigate to product details
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
