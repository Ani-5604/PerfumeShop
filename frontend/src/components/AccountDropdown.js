// src/components/AccountDropdown.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
const AccountDropdown = ({ onLogout, user = {} }) => {
    return (
        <div className="account-dropdown">
            <div className="profile-info">
                {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="profile-photo" />
                ) : (
                    <div className="profile-photo-placeholder">No Photo</div>
                )}
                <h4>{user.name || "Guest"}</h4>
            </div>
            <Link to="/account">Profile</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/promo">Promo Code</Link>
            <Link to="/history">Purchase History</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default AccountDropdown;
