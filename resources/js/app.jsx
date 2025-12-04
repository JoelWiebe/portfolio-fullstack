import './bootstrap';
import '../css/app.css';
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

// --- Authentication Context ---
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check session once when the app starts
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                // Always try to fetch the user. 
                // Since you use credentials: 'include', Laravel sends the session cookie automatically.
                const response = await fetch('/api/user', {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // 401 Unauthorized - User is strictly not logged in
                    setUser(null);
                }
            } catch (error) {
                // Network error or server down
                console.log("Auth check failed / Not authenticated");
                setUser(null);
            } finally {
                // Verification done, allow the app to render
                setLoading(false);
            }
        };

        verifyAuth();
    }, []); // Empty dependency array ensures this runs only once on page load/refresh

    const authContextValue = useMemo(() => ({
        user,
        setUser,
        loading,
    }), [user, loading]);

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// --- Protected Route Logic ---
const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
    const { user, loading } = useContext(AuthContext);
    
    // Show a blank screen (or spinner) while we ask Laravel if the cookie is valid
    if (loading) return <div className="min-h-screen bg-slate-50" />; 

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }
    
    return children;
};

// --- Public Route Logic ---
// Prevents logged-in users from seeing the Login page again
const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (user) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

// --- Main App Router ---
const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Portfolio />} />
    
                    {/* Guest Route (Redirects if logged in) */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
    
                    {/* Secure Route (Redirects if logged out) */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

if (document.getElementById('root')) {
    const root = createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}