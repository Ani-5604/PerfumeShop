// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './components/ProductPage';
import Collections from './components/Collections';
import About from './components/About';
import Offers from './components/Offers';
import Signup from './components/Signup';
import { auth } from './firebase'; // Import auth from firebase
import { onAuthStateChanged } from 'firebase/auth';
import ReviewForm from './components/ReviewForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} /> {/* Pass user to Navbar if needed */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/:id/review" element={<ReviewForm/>} /> {/* Separate review form route */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
