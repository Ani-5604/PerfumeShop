// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Import Firebase auth and provider
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; // Import required Firebase methods
import './Signup.css'; // Import your CSS styles

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle traditional email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up successfully!', user);
      // Optionally, you can set user display name here if needed
      await user.updateProfile({ displayName: username });
      navigate('/'); // Redirect after signup
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful!', user);
      // Optionally, you can save additional user info to your database here
      navigate('/'); // Redirect after successful sign-in
    } catch (error) {
      console.error('Error during Google sign-in:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      {/* Line or separator for Google sign-in option */}
      <div className="or-container">
        <hr />
        <span className="or-text">or</span>
        <hr />
      </div>

      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Continue signup with Google
      </button>
    </div>
  );
};

export default Signup;
