import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AdminDashboard from '../AdminDashboard';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock child components and external dependencies
vi.mock('../ProjectForm', () => ({
    __esModule: true,
    default: ({ project, onSave, onCancel }) => (
        <div data-testid="project-form">
            <h2>{project ? 'Edit Project' : 'Create New Project'}</h2>
            <button onClick={() => onSave(project || { title: 'New Mock Project' })}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    ),
}));

// Mock API responses
const mockProjects = [
    { id: 1, title: 'Project One', summary: 'Summary one', categories: ['Web'], role: 'Dev' },
    { id: 2, title: 'Project Two', summary: 'Summary two', categories: ['Mobile'], role: 'Lead' },
];

// Mock localStorage
const localStorageMock = (() => {
    let store = { portfolio_token: 'fake-token' };
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        removeItem: function(key) {
            delete store[key];
        },
        clear: function() {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.confirm
Object.defineProperty(window, 'confirm', { value: vi.fn(() => true) });


describe('AdminDashboard CRUD functionality', () => {

    beforeEach(() => {
        // Reset mocks before each test
        vi.spyOn(window, 'fetch').mockImplementation((url) => {
            if (url.toString().endsWith('/api/projects')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockProjects),
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
        });
        window.confirm.mockClear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('fetches and displays projects on initial render', async () => {
        render(<AdminDashboard />);
        expect(screen.getByText('Loading projects...')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Project One')).toBeInTheDocument();
            expect(screen.getByText('Project Two')).toBeInTheDocument();
        });
    });

    test('opens the create form, submits a new project, and refreshes the list', async () => {
        render(<AdminDashboard />);
        const user = userEvent.setup();

        // Wait for initial projects to load
        await waitFor(() => expect(screen.getByText('Project One')).toBeInTheDocument());
        
        // Mock the POST request for creation...
        vi.spyOn(window, 'fetch')
            .mockImplementationOnce((url, options) => {
                if (options.method === 'POST') {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({ id: 3, title: 'New Mock Project' }),
                    });
                }
                return Promise.reject(new Error('First call was not a POST'));
            })
            // ...and then mock the subsequent GET request to refresh the list.
            .mockImplementationOnce(() => Promise.resolve({
                ok: true,
                json: () => Promise.resolve([...mockProjects, { id: 3, title: 'New Mock Project' }]),
            }));

        // Click "Add New Project"
        await user.click(screen.getByRole('button', { name: /Add New Project/i }));
        
        // The mocked form should be visible
        expect(screen.getByTestId('project-form')).toBeInTheDocument();
        expect(screen.getByText('Create New Project')).toBeInTheDocument();
        
        // Click save in the mocked form
        await user.click(screen.getByRole('button', { name: 'Save' }));
        
        // Verify fetch was called for POST
        expect(window.fetch).toHaveBeenCalledWith('/api/projects', expect.any(Object));

        // Form should disappear and list should be refreshed
        await waitFor(() => {
            expect(screen.queryByTestId('project-form')).not.toBeInTheDocument();
            expect(screen.getByText('New Mock Project')).toBeInTheDocument();
        });
    });

    test('opens the edit form, submits an update, and refreshes the list', async () => {
        render(<AdminDashboard />);
        const user = userEvent.setup();

        await waitFor(() => expect(screen.getByText('Project One')).toBeInTheDocument());

        const updatedProject = { ...mockProjects[0], title: 'Project One Updated' };

        // Mock the PUT request for update...
        vi.spyOn(window, 'fetch')
            .mockImplementationOnce((url, options) => {
                if (options.method === 'PUT' && url.toString().includes(`/api/projects/${mockProjects[0].id}`)) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve(updatedProject),
                    });
                }
                return Promise.reject(new Error('First call was not a PUT to the correct URL'));
            })
            // ...and then mock the subsequent GET request to refresh the list.
            .mockImplementationOnce(() => Promise.resolve({
                 ok: true,
                 json: () => Promise.resolve([updatedProject, mockProjects[1]]),
            }));

        // Click the first "Edit" button
        await user.click(screen.getAllByTitle('Edit')[0]);

        // Mocked form should be visible for editing
        expect(screen.getByTestId('project-form')).toBeInTheDocument();
        expect(screen.getByText('Edit Project')).toBeInTheDocument();

        // Click save in the mocked form
        await user.click(screen.getByRole('button', { name: 'Save' }));

        // Verify fetch was called for PUT
        expect(window.fetch).toHaveBeenCalledWith(`/api/projects/${mockProjects[0].id}`, expect.any(Object));

        // Form should disappear and list should be updated
        await waitFor(() => {
            expect(screen.queryByTestId('project-form')).not.toBeInTheDocument();
            expect(screen.getByText('Project One Updated')).toBeInTheDocument();
        });
    });

    test('deletes a project after confirmation and removes it from the list', async () => {
        render(<AdminDashboard />);
        const user = userEvent.setup();

        await waitFor(() => expect(screen.getByText('Project One')).toBeInTheDocument());

        // Mock the DELETE request...
        vi.spyOn(window, 'fetch')
            .mockImplementationOnce((url, options) => {
                if (options.method === 'DELETE' && url.toString().includes(`/api/projects/${mockProjects[0].id}`)) {
                    return Promise.resolve({ ok: true });
                }
                return Promise.reject(new Error('First call was not a DELETE to the correct URL'));
            })
            // ...and then mock the subsequent GET request to refresh the list.
            .mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([mockProjects[1]]) }));
        
        // Click the first "Delete" button
        await user.click(screen.getAllByTitle('Delete')[0]);

        // Check that window.confirm was called
        expect(window.confirm).toHaveBeenCalledTimes(1);

        // Verify fetch was called for DELETE
        expect(window.fetch).toHaveBeenCalledWith(`/api/projects/${mockProjects[0].id}`, expect.any(Object));

        // The project should be removed from the list
        await waitFor(() => {
            expect(screen.queryByText('Project One')).not.toBeInTheDocument();
            expect(screen.getByText('Project Two')).toBeInTheDocument();
        });
    });

    test('does not delete a project if confirmation is cancelled', async () => {
        window.confirm.mockReturnValueOnce(false); // Simulate user clicking 'Cancel'
        render(<AdminDashboard />);
        const user = userEvent.setup();

        await waitFor(() => expect(screen.getByText('Project One')).toBeInTheDocument());

        const fetchSpy = vi.spyOn(window, 'fetch');

        // Click the first "Delete" button
        await user.click(screen.getAllByTitle('Delete')[0]);

        // Check that window.confirm was called
        expect(window.confirm).toHaveBeenCalledTimes(1);
        
        // Ensure fetch was NOT called for DELETE
        expect(fetchSpy).not.toHaveBeenCalledWith(expect.stringContaining('/api/projects/'), expect.objectContaining({ method: 'DELETE' }));

        // The project should still be in the list
        expect(screen.getByText('Project One')).toBeInTheDocument();
    });

    test('shows an error message if fetching projects fails', async () => {
        // Mock fetch to return an error
        window.fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        }));
        
        render(<AdminDashboard />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch projects/i)).toBeInTheDocument();
        });
    });
});