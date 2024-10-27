import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp, FaShareAlt } from 'react-icons/fa';
import ReviewForm from '../components/ReviewForm'; // Adjust the import path if necessary
import './ProductPage.css';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [reviews, setReviews] = useState([]); // Initialize reviews state
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [additionalProducts, setAdditionalProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const productId = window.location.pathname.split('/').pop();
    const shareUrl = window.location.href;

    const toggleShareOptions = () => {
        setShowShareOptions((prev) => !prev);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Set loading before fetching
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!response.ok) throw new Error('Failed to fetch product');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const reviewsData = await response.json();
                console.log('Reviews fetched:', reviewsData);
                setReviews(reviewsData); // Set the fetched reviews
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        const fetchAdditionalProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/recommended/${productId}`);
                if (!response.ok) throw new Error('Failed to fetch additional products');
                const data = await response.json();
                setAdditionalProducts(data);
            } catch (error) {
                console.error('Error fetching additional products:', error);
                setIsError(true);
                setErrorMessage(error.message);
            }
        };

        fetchProduct();
        fetchReviews(); // Call fetchReviews to get initial reviews
        fetchAdditionalProducts();
    }, [productId]);

    const handleReviewSubmit = async (productId, review) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review: ' + response.statusText);
            }

            const result = await response.json();
            setSubmissionMessage(result.message); // Display success message
            setIsError(false);

            // Fetch updated reviews after submitting a new review
            const updatedReviewsResponse = await fetch(`http://localhost:5000/api/products/${productId}/reviews`);
            const updatedReviewsData = await updatedReviewsResponse.json();
            setReviews(updatedReviewsData); // Update the reviews state with the latest reviews
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmissionMessage('Error submitting review');
            setIsError(true);
        }
    };

    if (loading) return <div>Loading product details...</div>; // Loading state

    if (!product) return <div>Error loading product. Please try again.</div>; // Handle case where product isn't loaded

    return (
        <div className="product-page">
            {isError && <div className="error-message">{errorMessage}</div>}

            <div className="product-info">
                <img
                    src={product.image ? `http://localhost:5000${product.image}` : 'path/to/placeholder/image.jpg'}
                    alt={product.name}
                    className="product-image"
                />
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <div className="price-rating">
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <div className="product-rating">
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="3px"
                            />
                            <span>{product.rating} / 5</span>
                        </div>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="buy-now-btn">Buy Now</button>

                    <div className="share-container">
                        <button className="share-btn" onClick={toggleShareOptions}>
                            <FaShareAlt size={20} /> Share
                        </button>
                        {showShareOptions && (
                            <div className="share-dropdown">
                                <h4>Share via</h4>
                                <FacebookShareButton url={shareUrl}>
                                    <button className="social-share-btn"><FaFacebook size={20} /> Facebook</button>
                                </FacebookShareButton>
                                <TwitterShareButton url={shareUrl}>
                                    <button className="social-share-btn"><FaTwitter size={20} /> Twitter</button>
                                </TwitterShareButton>
                                <WhatsappShareButton url={shareUrl}>
                                    <button className="social-share-btn"><FaWhatsapp size={20} /> WhatsApp</button>
                                </WhatsappShareButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="product-variants-title">More Options</h2>
            <div className="product-variants">
                {product.variants && product.variants.map((variant) => (
                    <div key={variant._id} className="variant-card">
                        <img
                            src={variant.image ? `http://localhost:5000${variant.image}` : 'path/to/placeholder/image.jpg'}
                            alt={variant.name}
                            className="variant-image"
                        />
                        <div>
                            <h3 className="variant-name">{variant.name}</h3>
                            <p className="variant-price">${variant.price.toFixed(2)}</p>
                        </div>
                        <button className="view-variant-btn">View Product</button>
                    </div>
                ))}
            </div>

            <h2 className="review-title">Customer Reviews</h2>
            <div className="reviews-section">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <h4>{review.username}</h4>
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="userRating"
                                starDimension="15px"
                                starSpacing="2px"
                            />
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to leave a review!</p>
                )}
            </div>

            <ReviewForm onSubmit={handleReviewSubmit} submissionMessage={submissionMessage} isError={isError} />
            
            <h2 className="recommended-products-title">You Might Also Like</h2>
            <div className="recommended-products">
                {additionalProducts.map((recommendedProduct) => (
                    <div key={recommendedProduct._id} className="recommended-product-card">
                        <img
                            src={recommendedProduct.image ? `http://localhost:5000${recommendedProduct.image}` : 'path/to/placeholder/image.jpg'}
                            alt={recommendedProduct.name}
                            className="recommended-product-image"
                        />
                        <h3>{recommendedProduct.name}</h3>
                        <p>${recommendedProduct.price.toFixed(2)}</p>
                        <button className="view-recommended-product-btn">View Product</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
