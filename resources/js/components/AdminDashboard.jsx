import React, { useState, useEffect } from 'react';
import { useNavigate, Link, BrowserRouter, useInRouterContext } from 'react-router-dom';
import { 
  Plus, 
  LogOut, 
  Trash2, 
  Edit, 
  Search, 
  AlertTriangle 
} from 'lucide-react';

const AdminDashboardContent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch Projects on Load
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project? This cannot be undone.')) return;

        try {
            const token = localStorage.getItem('portfolio_token');
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Failed to delete project');

            // Remove from local state to update UI instantly
            setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
            alert('Error deleting project: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('portfolio_token');
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
        } catch (error) {
            console.error("Logout error", error);
        }
        
        localStorage.removeItem('portfolio_token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Admin Header */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold">Admin</div>
                        <h1 className="text-xl font-bold text-slate-800">Project Console</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                            View Live Site
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Portfolio Projects</h2>
                        <p className="text-slate-500">Manage your featured work.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">
                        <Plus className="w-5 h-5" /> Add New Project
                    </button>
                </div>

                {/* Loading / Error States */}
                {loading && <div className="text-center py-12 text-slate-500">Loading projects...</div>}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> {error}
                    </div>
                )}

                {/* Projects List */}
                {!loading && !error && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 font-semibold">
                                    <th className="p-4 w-1/3">Project Title</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900">{project.title}</div>
                                            <div className="text-xs text-slate-400 mt-1 truncate max-w-xs">{project.summary}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.categories?.slice(0, 1).map(cat => (
                                                    <span key={cat} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">
                                                        {cat}
                                                    </span>
                                                ))}
                                                {(project.categories?.length > 1) && (
                                                    <span className="text-xs text-slate-400 self-center">+{project.categories.length - 1}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">{project.role}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {projects.length === 0 && (
                            <div className="p-12 text-center text-slate-500">
                                No projects found in the database.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

// Wrapper component to ensure Router context exists
const AdminDashboard = () => {
    const hasRouter = useInRouterContext();

    if (!hasRouter) {
        return (
            <BrowserRouter>
                <AdminDashboardContent />
            </BrowserRouter>
        );
    }

    return <AdminDashboardContent />;
};

export default AdminDashboard;