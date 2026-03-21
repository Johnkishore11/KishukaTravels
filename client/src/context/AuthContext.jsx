import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const { data } = await axios.get('/api/users/profile');
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('/api/users/auth', { email, password });
        setUser(data);
        return data;
    };

    const register = async (name, email, password, phone) => {
        const { data } = await axios.post('/api/users', { name, email, password, phone });
        setUser(data);
    };

    const logout = async () => {
        await axios.post('/api/users/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
