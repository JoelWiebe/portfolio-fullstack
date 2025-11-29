import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Portfolio from './components/Portfolio';
import Login from './components/Login';

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

// --- Admin Dashboard Placeholder ---
// In the next phase, we will replace this with a real AdminPanel component
// that uses the CREATE/UPDATE/DELETE API endpoints.
const AdminDashboard = () => (
    <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Admin Console</h1>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('portfolio_token');
                            window.location.href = '/login';
                        }}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                        Sign Out
                    </button>
                </div>
                <div className="p-4 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                    <p className="font-semibold">✅ Secure Access Granted</p>
                    <p className="text-sm mt-1">You are authenticated via Laravel Sanctum. This area will soon contain forms to Add and Edit projects.</p>
                </div>
            </div>
        </div>
    </div>
);

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