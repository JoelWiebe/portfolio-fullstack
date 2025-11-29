import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

// --- Protected Route Logic ---
// This wrapper checks if a valid token exists in LocalStorage.
// If not, it forces the user back to the /login page.
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('portfolio_token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

// --- Main App Router ---
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Public Portfolio (The Home Page) */}
                <Route path="/" element={<Portfolio />} />

                {/* 2. Admin Login */}
                <Route path="/login" element={<Login />} />

                {/* 3. Protected Admin Area */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* 4. Catch-all: Redirect unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

// --- Mount to DOM ---
if (document.getElementById('root')) {
    const root = createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}