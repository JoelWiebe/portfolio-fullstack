import React, { useEffect, useRef } from 'react';
import { X, Github, Globe, Apple, Play } from 'lucide-react';

const ProjectDetailModal = ({ project, onClose }) => {
    const modalRef = useRef(null);

    // Handle focus trapping and Escape key to close
    useEffect(() => {
        if (!project) return;

        const modalElement = modalRef.current;
        if (!modalElement) return;

        // Focus the modal container when it opens
        modalElement.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'Tab') {
                const focusableElements = modalElement.querySelectorAll(
                    'a[href], button, textarea, input, select'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [project, onClose]);

    if (!project) return null;

    const renderLink = (url, Icon, label) => {
        if (!url) return null;
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
                <Icon className="w-4 h-4" />
                {label}
            </a>
        );
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col focus:outline-none"
                tabIndex="-1"
            >
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">{project.title}</h2>
                    <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100" aria-label="Close project details">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {project.image_url && (
                        <img src={project.image_url} alt={`Cover image for ${project.title}`} className="w-full h-64 object-cover rounded-lg shadow-sm" />
                    )}

                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Summary</h3>
                        <p className="text-slate-600">{project.summary}</p>
                    </div>

                    {project.description && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">Description</h3>
                            <p className="text-slate-600 whitespace-pre-line">{project.description}</p>
                        </div>
                    )}

                    {project.role && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">My Role</h3>
                            <p className="text-slate-600">{project.role}</p>
                        </div>
                    )}

                    {(project.url_repo || project.url_web || project.url_ios || project.url_android || project.links?.length > 0) && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">Links</h3>
                            <div className="flex flex-wrap gap-3">
                                {renderLink(project.url_web, Globe, 'Live Site')}
                                {renderLink(project.url_repo, Github, 'Repository')}
                                {renderLink(project.url_ios, Apple, 'App Store')}
                                {renderLink(project.url_android, Play, 'Play Store')}
                                {project.links?.map((link, index) => (
                                    renderLink(link.url, Globe, link.name) // Using Globe as a generic icon for custom links
                                ))}
                            </div>
                        </div>
                    )}

                    {(project.categories?.length > 0 || project.tags?.length > 0) && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">Details</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.categories?.map(cat => (
                                    <span key={cat} className="px-3 py-1 bg-[#002A5C] text-white rounded-full text-sm font-medium">
                                        {cat}
                                    </span>
                                ))}
                                {project.tags?.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-[#002A5C] text-white rounded-md text-sm font-medium hover:bg-[#00204E] shadow-sm transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
