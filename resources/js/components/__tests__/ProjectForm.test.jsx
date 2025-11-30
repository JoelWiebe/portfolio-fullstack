import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
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
    test('updates state when user types in text fields', async () => {
        const user = userEvent.setup();
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        render(<ProjectForm onSave={handleSave} onCancel={handleCancel} />);
        
        const titleInput = screen.getByLabelText('Project Title');
        await user.type(titleInput, 'New Title');
        expect(titleInput).toHaveValue('New Title');
    });

    // Test 4: Category management
    test('allows adding and removing categories', async () => {
        const user = userEvent.setup();
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const categoryInput = screen.getByLabelText('Categories');
        const addCategoryBtn = screen.getByRole('button', { name: 'Add Category' });

        // Add
        await user.type(categoryInput, 'Frontend');
        await user.click(addCategoryBtn);
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(categoryInput).toHaveValue('');
 
        // Remove
        const removeBtn = screen.getByRole('button', { name: /remove Frontend/i });
        await user.click(removeBtn);
        expect(screen.queryByText('Frontend')).not.toBeInTheDocument();
    });

    // Test 5: Tag management
    test('allows adding and removing tags', async () => {
        const user = userEvent.setup();
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const tagInput = screen.getByLabelText('Tags');
        const addTagBtn = screen.getByRole('button', { name: 'Add Tag' });

        // Add
        await user.type(tagInput, 'JavaScript');
        await user.click(addTagBtn);
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(tagInput).toHaveValue('');
 
        // Remove
        const removeBtn = screen.getByRole('button', { name: /remove JavaScript/i });
        await user.click(removeBtn);
        expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    // Test 6: Link management
    test('allows adding and removing links', async () => {
        const user = userEvent.setup();
        render(<ProjectForm onSave={vi.fn()} onCancel={vi.fn()} />);
        const nameInput = screen.getByLabelText('Link Name');
        const urlInput = screen.getByLabelText('Link URL');
        const addLinkBtn = screen.getByRole('button', { name: 'Add Link' });
 

        // Add
        await user.type(nameInput, 'My Blog');
        await user.type(urlInput, 'https://blog.example.com');
        await user.click(addLinkBtn);
        
        expect(screen.getByText('My Blog:')).toBeInTheDocument();
        expect(screen.getByText('https://blog.example.com')).toBeInTheDocument();
        expect(nameInput).toHaveValue('');
        expect(urlInput).toHaveValue('');

        // Remove 
        const removeBtn = screen.getByRole('button', { name: /remove My Blog/i });
        await user.click(removeBtn);
        expect(screen.queryByText('My Blog:')).not.toBeInTheDocument();
    });

    // Test 7: Cancel button
    test('calls onCancel when the cancel button is clicked', async () => {
        const user = userEvent.setup();
        const handleCancel = vi.fn();
        render(<ProjectForm onSave={vi.fn()} onCancel={handleCancel} />);
        
        await user.click(screen.getByText('Cancel'));
        expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    // Test 8: Submit button in 'Create' mode
    test('calls onSave with the form data when creating a new project', async () => {
        const user = userEvent.setup();
        const handleSave = vi.fn();
        render(<ProjectForm onSave={handleSave} onCancel={vi.fn()} />);

        await user.type(screen.getByLabelText('Project Title'), 'Final Project');
        await user.type(screen.getByLabelText('Summary / Subtitle'), 'Final Summary');

        await user.click(screen.getByText('Create Project'));

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
    test('calls onSave with updated form data when editing a project', async () => {
        const user = userEvent.setup();
        const handleSave = vi.fn();
        render(<ProjectForm project={mockProject} onSave={handleSave} onCancel={vi.fn()} />);

        const titleInput = screen.getByLabelText('Project Title');
        await user.clear(titleInput);
        await user.type(titleInput, 'Updated Test Project');
        
        await user.click(screen.getByText('Save Changes'));

        expect(handleSave).toHaveBeenCalledTimes(1);
        expect(handleSave).toHaveBeenCalledWith(expect.objectContaining({
            ...mockProject,
            title: 'Updated Test Project',
        }));
    });
});