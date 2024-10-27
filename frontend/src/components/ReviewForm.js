import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';


const ReviewForm = ({ onSubmit, submissionMessage, isError }) => {
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && rating > 0) {
            onSubmit({ username, rating, comment });
            setUsername('');
            setRating(0);
            setComment('');
        }
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Leave a Review</h3>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                required
                aria-label="Your name"
            />
            <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={setRating}
                numberOfStars={5}
                name="userRating"
                starDimension="25px"
                starSpacing="5px"
            />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your comment"
                aria-label="Your comment"
            />
            <button type="submit" aria-label="Submit review">Submit Review</button>
            {submissionMessage && <p className={isError ? 'error' : 'success'}>{submissionMessage}</p>}
        </form>
    );
};

export default ReviewForm;
