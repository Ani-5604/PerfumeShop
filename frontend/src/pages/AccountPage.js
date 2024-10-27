import React from 'react';
import { FaWallet, FaGift, FaHistory } from 'react-icons/fa';
import '../styles.css';

const AccountPage = ({ user, onPhotoUpload }) => {
    return (
        <div className="account-page">
            <h2 className="account-title">Account Details</h2>
            <div className="account-details-card">
                <div className="profile-photo-container">
                    {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="Profile" className="profile-photo-large" />
                    ) : (
                        <div className="profile-photo-placeholder">No Photo</div>
                    )}

                    {/* File input for uploading a new profile picture */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onPhotoUpload}
                        className="profile-photo-upload"
                    />
                </div>
                <div className="account-info">
                    <h4>Name: <span>{user.name}</span></h4>
                    <h4>Email: <span>{user.email}</span></h4>
                </div>
            </div>

            <div className="account-sections">
                <div className="account-card">
                    <FaWallet className="account-icon" />
                    <h3>Wallet</h3>
                    <p>Balance: <strong>${user.walletBalance}</strong></p>
                </div>

                <div className="account-card">
                    <FaGift className="account-icon" />
                    <h3>Promo Codes</h3>
                    <ul>
                        {user.promoCodes.length > 0 ? (
                            user.promoCodes.map((code, index) => <li key={index}>{code}</li>)
                        ) : (
                            <li>No promo codes available.</li>
                        )}
                    </ul>
                </div>

                <div className="account-card">
                    <FaHistory className="account-icon" />
                    <h3>Purchase History</h3>
                    <ul>
                        {user.purchaseHistory.length > 0 ? (
                            user.purchaseHistory.map((purchase, index) => (
                                <li key={index}>
                                    {purchase.productName} - ${purchase.amount}
                                </li>
                            ))
                        ) : (
                            <li>No purchases made yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
