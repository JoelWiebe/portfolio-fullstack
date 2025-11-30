import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const ProjectForm = ({ project: initialProject, onSave, onCancel }) => {
    const isEditing = Boolean(initialProject);
    const [project, setProject] = useState({
        title: '',
        summary: '',
        description: '',
        role: '',
        url_web: '',
        url_ios: '',
        url_android: '',
        url_repo: '',
        tags: [],
        categories: [],
        links: [],
    });

    const [tagInput, setTagInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [linkInput, setLinkInput] = useState({ name: '', url: '' });

    useEffect(() => {
        if (isEditing) {
            setProject({
                ...initialProject,
                tags: initialProject.tags || [],
                categories: initialProject.categories || [],
                links: initialProject.links || [],
            });
        }
    }, [initialProject, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const addTag = () => {
        if (tagInput && !project.tags.includes(tagInput)) {
            setProject(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };
    const removeTag = (tagToRemove) => {
        setProject(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const addCategory = () => {
        if (categoryInput && !project.categories.includes(categoryInput)) {
            setProject(prev => ({ ...prev, categories: [...prev.categories, categoryInput.trim()] }));
            setCategoryInput('');
        }
    };
    const removeCategory = (catToRemove) => {
        setProject(prev => ({ ...prev, categories: prev.categories.filter(cat => cat !== catToRemove) }));
    };

    const addLink = () => {
        if (linkInput.name && linkInput.url) {
            setProject(prev => ({ ...prev, links: [...prev.links, linkInput] }));
            setLinkInput({ name: '', url: '' });
        }
    };
    const removeLink = (index) => {
        setProject(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(project);
    };

    const renderInput = (name, label, type = 'text', required = false) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={project[name] || ''}
                onChange={handleChange}
                required={required}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
        </div>
    );
    
    const renderTextarea = (name, label) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <textarea
                name={name}
                id={name}
                value={project[name] || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            ></textarea>
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-12">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Edit Project' : 'Create New Project'}</h2>
                    <button onClick={onCancel} className="p-2 rounded-full hover:bg-slate-100">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {renderInput('title', 'Project Title', 'text', true)}
                        {renderInput('summary', 'Summary / Subtitle', 'text', true)}
                        {renderTextarea('description', 'Full Description')}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {renderInput('role', 'My Role')}
                           {renderInput('url_repo', 'Repository URL', 'url')}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {renderInput('url_web', 'Live Website URL', 'url')}
                           {renderInput('url_ios', 'App Store URL', 'url')}
                           {renderInput('url_android', 'Play Store URL', 'url')}
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Categories</label>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="text" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCategory())} className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm" placeholder="e.g., Web Development" />
                                <button type="button" onClick={addCategory} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200"><Plus className="w-4 h-4 inline-block mr-1"/>Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.categories.map(cat => (
                                    <span key={cat} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-sm">
                                        {cat} <button type="button" onClick={() => removeCategory(cat)}><X className="w-3 h-3"/></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                            <div className="flex items-center gap-2 mb-2">
                                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm" placeholder="e.g., React, Laravel, API" />
                                <button type="button" onClick={addTag} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200"><Plus className="w-4 h-4 inline-block mr-1"/>Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-2 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-sm">
                                        {tag} <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3"/></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Associated Links</label>
                            <div className="space-y-2 mb-3">
                                {project.links.map((link, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                                        <div className="flex-grow text-sm">
                                            <span className="font-semibold text-slate-800">{link.name}: </span>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline truncate">{link.url}</a>
                                        </div>
                                        <button type="button" onClick={() => removeLink(index)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><Trash2 className="w-4 h-4"/></button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 p-2 border border-dashed border-slate-300 rounded-lg">
                                <input type="text" value={linkInput.name} onChange={e => setLinkInput({ ...linkInput, name: e.target.value })} className="w-1/3 px-3 py-2 border border-slate-300 rounded-md text-sm" placeholder="Link Name (e.g., Live Demo)" />
                                <input type="url" value={linkInput.url} onChange={e => setLinkInput({ ...linkInput, url: e.target.value })} className="flex-grow px-3 py-2 border border-slate-300 rounded-md text-sm" placeholder="https://..." />
                                <button type="button" onClick={addLink} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200"><Plus className="w-4 h-4 inline-block mr-1"/>Add</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end items-center gap-3">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm">
                            {isEditing ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;