import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Additional functions can be added as needed
