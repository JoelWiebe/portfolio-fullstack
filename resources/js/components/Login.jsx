import React, { useState } from 'react';
import { useNavigate, BrowserRouter, useInRouterContext } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

// The inner form component that uses navigation logic
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // CSRF protection for Laravel
            // Note: In a preview environment, this fetch might 404, which is expected.
            try {
                await fetch('/sanctum/csrf-cookie');
            } catch (csrfError) {
                console.warn("CSRF cookie fetch failed - ignoring for preview");
            }

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save the token securely
            localStorage.setItem('portfolio_token', data.token);
            
            // Redirect to the Admin Dashboard
            navigate('/admin');

        } catch (err) {
            // Ensure we only set string errors to prevent "Object not valid" crashes
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Admin Access</h2>
                    <p className="mt-2 text-slate-600">Sign in to manage your portfolio</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 block w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 block w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Wrapper component to ensure Router context exists
const Login = () => {
    // Check if we are already inside a Router (like in the real App)
    const hasRouter = useInRouterContext();

    // If no router (e.g. standalone preview), wrap in BrowserRouter
    if (!hasRouter) {
        return (
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
    }

    // Otherwise render directly
    return <LoginForm />;
};

export default Login;