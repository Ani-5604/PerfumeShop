import React, { useState, useEffect } from 'react';
import './Banner.css';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const banners = [
  {
    img: '/images/Baner_1.jpg', // Correct public path
    title: 'Explore Our Latest Collections',
    subtitle: 'Discover your perfect fragrance today!',
  },
  {
    img: '/images/Baner_2.jpg', // Correct public path
    title: 'Limited Time Offer!',
    subtitle: 'Get 20% off on your first purchase!',
  },
  {
    img: '/images/Baner_3.jpg', // Correct public path
    title: 'Exclusive Fragrances',
    subtitle: 'Unveil the essence of elegance and luxury.',
  },
];

const Banner = () => {
  const navigate = useNavigate(); // Change to useNavigate
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length); // Loop through banners
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // Handle manual banner change
  const handlePrevClick = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handleCardClick = () => {
    navigate('/product'); // Navigate to the product page
  };

  return (
    <section 
      className="banner" 
      style={{ backgroundImage: `url(${banners[currentBanner].img})` }}
    >
      <div className="banner-content">
        <h1>{banners[currentBanner].title}</h1>
        <p>{banners[currentBanner].subtitle}</p>
        <button className="shop-now-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(); }}>Shop Now</button>
      </div>

      {/* Left arrow button */}
      <button className="banner-nav-button prev" onClick={handlePrevClick}>
        &#8249;
      </button>

      {/* Right arrow button */}
      <button className="banner-nav-button next" onClick={handleNextClick}>
        &#8250;
      </button>
    </section>
  );
};

export default Banner;
