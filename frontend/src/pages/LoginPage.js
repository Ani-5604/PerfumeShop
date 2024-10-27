import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles.css';
const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });
            setUser(data);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
