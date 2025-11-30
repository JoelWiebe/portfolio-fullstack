import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ProjectForm from '../ProjectForm';
import '@testing-library/jest-dom';

const mockProject = {
    id: 1,
    title: 'Test Project',
    summary: 'A project for testing',
    description: 'Detailed description.',
    role: 'Test Developer',
    url_web: 'https://example.com',
    url_repo: 'https://github.com/example/test',
    tags: ['React', 'Testing'],
    categories: ['Web App'],
    links: [{ name: 'Live Demo', url: 'https://example.com' }],
};

describe('ProjectForm', () => {
    
    // Test 1: Rendering in 'Create' mode
    test('renders correctly for creating a new project', () => {
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        render(<ProjectForm onSave={handleSave} onCancel={handleCancel} />);

        expect(screen.getByText('Create New Project')).toBeInTheDocument();
        expect(screen.getByLabelText('Project Title')).toHaveValue('');
        expect(screen.getByText('Create Project')).toBeInTheDocument();
    });

    // Test 2: Rendering in 'Edit' mode
    test('renders correctly and populates fields when editing a project', () => {
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        render(<ProjectForm project={mockProject} onSave={handleSave} onCancel={handleCancel} />);

        expect(screen.getByText('Edit Project')).toBeInTheDocument();
        expect(screen.getByLabelText('Project Title')).toHaveValue(mockProject.title);
        expect(screen.getByLabelText('Summary / Subtitle')).toHaveValue(mockProject.summary);
        expect(screen.getByText(mockProject.tags[0])).toBeInTheDocument();
        expect(screen.getByText(mockProject.categories[0])).toBeInTheDocument();
        expect(screen.getByText(mockProject.links[0].name + ':')).toBeInTheDocument();
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    // Test 3: Input change handling
    test('updates state when user types in text fields', () => {
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        render(<ProjectForm onSave={handleSave} onCancel={handleCancel} />);
        
        const titleInput = screen.getByLabelText('Project Title');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });
        expect(titleInput).toHaveValue('New Title');
    });

    // Test 4: Category management
    test('allows adding and removing categories', () => {
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const categoryInput = screen.getByPlaceholderText('e.g., Web Development');
        const addCategoryBtn = screen.getByRole('button', { name: /Add/i });

        // Add
        fireEvent.change(categoryInput, { target: { value: 'Frontend' } });
        fireEvent.click(addCategoryBtn);
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(categoryInput).toHaveValue('');

        // Remove
        const removeBtn = screen.getByRole('button', { name: /remove category/i }); // Assuming Lucide's X has no accessible name
        fireEvent.click(removeBtn);
        expect(screen.queryByText('Frontend')).not.toBeInTheDocument();
    });

    // Test 5: Tag management
    test('allows adding and removing tags', () => {
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const tagInput = screen.getByPlaceholderText('e.g., React, Laravel, API');
        const addTagBtn = screen.getAllByRole('button', { name: /Add/i })[1]; // second add button

        // Add
        fireEvent.change(tagInput, { target: { value: 'JavaScript' } });
        fireEvent.click(addTagBtn);
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(tagInput).toHaveValue('');

        // Remove
        const removeBtn = screen.getByRole('button', { name: /remove tag/i });
        fireEvent.click(removeBtn);
        expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    // Test 6: Link management
    test('allows adding and removing links', () => {
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const nameInput = screen.getByPlaceholderText('Link Name (e.g., Live Demo)');
        const urlInput = screen.getByPlaceholderText('https://...');
        const addLinkBtn = screen.getAllByRole('button', { name: /Add/i }).find(btn => btn.textContent.includes('Add'));


        // Add
        fireEvent.change(nameInput, { target: { value: 'My Blog' } });
        fireEvent.change(urlInput, { target: { value: 'https://blog.example.com' } });
        fireEvent.click(addLinkBtn);
        
        expect(screen.getByText('My Blog:')).toBeInTheDocument();
        expect(screen.getByText('https://blog.example.com')).toBeInTheDocument();
        expect(nameInput).toHaveValue('');
        expect(urlInput).toHaveValue('');

        // Remove
        const removeBtn = screen.getByRole('button', { name: /remove link/i });
        fireEvent.click(removeBtn);
        expect(screen.queryByText('My Blog:')).not.toBeInTheDocument();
    });

    // Test 7: Cancel button
    test('calls onCancel when the cancel button is clicked', () => {
        const handleCancel = vi.fn();
        render(<ProjectForm onSave={vi.fn()} onCancel={handleCancel} />);
        
        fireEvent.click(screen.getByText('Cancel'));
        expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    // Test 8: Submit button in 'Create' mode
    test('calls onSave with the form data when creating a new project', () => {
        const handleSave = vi.fn();
        render(<ProjectForm onSave={handleSave} onCancel={vi.fn()} />);

        fireEvent.change(screen.getByLabelText('Project Title'), { target: { value: 'Final Project' } });
        fireEvent.change(screen.getByLabelText('Summary / Subtitle'), { target: { value: 'Final Summary' } });

        fireEvent.click(screen.getByText('Create Project'));

        expect(handleSave).toHaveBeenCalledTimes(1);
        expect(handleSave).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Final Project',
            summary: 'Final Summary',
            tags: [],
            categories: [],
            links: [],
        }));
    });
    
    // Test 9: Submit button in 'Edit' mode
    test('calls onSave with updated form data when editing a project', () => {
        const handleSave = vi.fn();
        render(<ProjectForm project={mockProject} onSave={handleSave} onCancel={vi.fn()} />);

        const titleInput = screen.getByLabelText('Project Title');
        fireEvent.change(titleInput, { target: { value: 'Updated Test Project' } });
        
        fireEvent.click(screen.getByText('Save Changes'));

        expect(handleSave).toHaveBeenCalledTimes(1);
        expect(handleSave).toHaveBeenCalledWith(expect.objectContaining({
            ...mockProject,
            title: 'Updated Test Project',
        }));
    });
});