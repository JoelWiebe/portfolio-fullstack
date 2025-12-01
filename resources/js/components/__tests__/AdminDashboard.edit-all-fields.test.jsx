import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AdminDashboard from '../AdminDashboard.jsx';
import { MemoryRouter } from 'react-router-dom';

// Mock the fetch function
global.fetch = vi.fn();

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
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'confirm', { value: vi.fn(() => true) });

const initialProject = {
    id: 1,
    title: 'Initial Project Title',
    summary: 'Initial project summary.',
    description: 'Initial project description.',
    image_url: 'http://example.com/initial.png',
    tags: ['React', 'Laravel'],
    categories: ['Web Development'],
    links: [{ name: 'live', url: 'http://example.com/live' }],
};

const updatedProjectData = {
    id: 1,
    title: 'Updated Project Title',
    summary: 'Updated project summary.',
    image_url: 'http://example.com/updated.png',
    tags: ['Svelte', 'Laravel'], // Updated 'React' to 'Svelte'
    categories: ['Web Development', 'SaaS'],
    links: [{ name: 'repository', url: 'http://github.com/new-repo' }],
};

const finalProjectData = {
    id: 1,
    title: 'Updated Project Title',
    summary: 'Updated project summary.',
    image_url: 'http://example.com/updated.png',
    tags: ['Laravel'], // 'Svelte' removed
    categories: ['Web Development'], // 'SaaS' removed
    links: [],
};

const renderComponent = () => {
    return render(
        <MemoryRouter>
            <AdminDashboard />
        </MemoryRouter>
    );
};

describe('AdminDashboard Edit Form CRUD', () => {
    beforeEach(() => {
        window.confirm.mockClear();
        vi.spyOn(window, 'fetch'); // Keep spy for assertions
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('should allow creating, updating, and deleting project fields', async () => {
        // 1. Initial render with one project
        fetch.mockImplementation((url, options) => {
            if (options?.method === 'PUT' || options?.method === 'POST') {
                return Promise.resolve({ ok: true, json: async () => ({}) });
            }
            // Default GET behavior
            return Promise.resolve({
                ok: true,
                json: async () => ([initialProject]),
            });
        });

        renderComponent();

        // Wait for the project to be displayed
        expect(await screen.findByText('Initial Project Title')).toBeInTheDocument();

        // Check that the summary is displayed
        const initialRow = screen.getByText('Initial Project Title').closest('tr');
        expect(initialRow).toHaveTextContent('Initial project summary.');

        // 2. Open the edit form
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));
        expect(await screen.findByRole('heading', { name: /edit project/i })).toBeInTheDocument();

        // 3. Update all fields in the form

        // Update Title
        fireEvent.change(screen.getByLabelText(/project title/i), {
            target: { value: 'Updated Project Title' },
        });

        // Update Description
        fireEvent.change(screen.getByLabelText(/summary \/ subtitle/i), {
            target: { value: 'Updated project summary.' },
        });

        // Update Image URL
        fireEvent.change(screen.getByLabelText(/Image URL/i), {
            target: { value: 'http://example.com/updated.png' },
        });

        // Update a Tag
        // To update, we remove the old one and add the new one
        fireEvent.click(screen.getByRole('button', { name: /remove react/i }));
        const tagInput = screen.getByLabelText(/tags/i);
        fireEvent.change(tagInput, { target: { value: 'Svelte' } });
        fireEvent.click(screen.getByRole('button', { name: /add tag/i }));

        // Add a Category
        const categoryInput = screen.getByLabelText(/categories/i);
        fireEvent.change(categoryInput, { target: { value: 'SaaS' } });
        fireEvent.click(screen.getByRole('button', { name: /add category/i }));

        // Update a Link URL
        // The form doesn't support editing existing links, only remove/add.
        // So we remove the old one and add the updated one.
        fireEvent.click(screen.getByRole('button', { name: /remove live/i }));
        
        // Add a new Link
        fireEvent.change(screen.getByLabelText(/link name/i), { target: { value: 'repository' } });
        fireEvent.change(screen.getByLabelText(/link url/i), {
            target: { value: 'http://github.com/new-repo' },
        });
        fireEvent.click(screen.getByRole('button', { name: /add link/i }));

        // 4. Mock the update and subsequent fetch
        fetch.mockImplementation((url, options) => {
            if (options?.method === 'PUT') {
                return Promise.resolve({ ok: true, json: async () => ({}) });
            }
            return Promise.resolve({ // GET request after update
                ok: true,
                json: async () => ([updatedProjectData]),
            });
        });

        // 5. Submit the form
        fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

        // 6. Verify all updated fields are displayed on the project card
        // First, wait for the form to disappear, then check the content.
        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: /edit project/i })).not.toBeInTheDocument();
        });
        
        expect(screen.getByText('Updated Project Title')).toBeInTheDocument();
        const projectCard = screen.getByText('Updated Project Title').closest('tr');
        
        // Check summary (which is used as the description in the list view)
        expect(projectCard).toHaveTextContent('Updated project summary.');

        // The dashboard list does not display tags, so we cannot assert their presence here.
        // We can only confirm the category is visible.

        // Check added category
        expect(projectCard).toHaveTextContent(/\+1/);

        // Check that old link is gone
        expect(projectCard.querySelector('a[href="http://example.com/live"]')).not.toBeInTheDocument();

        // --- DELETION PHASE ---

        // 7. Re-open the edit form to delete the newly added items
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));
        expect(await screen.findByRole('heading', { name: /edit project/i })).toBeInTheDocument();

        // Check that the input for the link URL contains the new repo URL
        expect(await screen.findByText('http://github.com/new-repo')).toBeInTheDocument();
        
        // 8. Delete the repository link, svelte tag, and saas category
        // Use more specific selectors based on the aria-label from ProjectForm.jsx
        fireEvent.click(screen.getByRole('button', { name: /remove repository/i }));

        // The tag to delete is now 'Svelte'
        fireEvent.click(screen.getByRole('button', { name: /remove svelte/i }));

        // The category to delete is 'SaaS'
        fireEvent.click(screen.getByRole('button', { name: /remove saas/i }));

        // 9. Verify the input fields are gone from the form
        await waitFor(() => {
            // Check that the displayed link is gone from the form
            expect(screen.queryByRole('link', { name: 'http://github.com/new-repo' })).not.toBeInTheDocument();
            expect(screen.queryByText('SaaS')).not.toBeInTheDocument();
        });

        // 10. Mock the second update and subsequent fetch
        fetch.mockImplementation((url, options) => {
            if (options?.method === 'PUT') {
                return Promise.resolve({ ok: true, json: async () => ({}) });
            }
            return Promise.resolve({ // GET request after second update
                ok: true,
                json: async () => ([finalProjectData]),
            });
        });

        // 11. Submit the form again
        fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

        // 12. Verify the items have been removed from the project card
        // Wait for the form to close first
        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: /edit project/i })).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(projectCard.querySelector('a[href="http://github.com/new-repo"]')).not.toBeInTheDocument();
            expect(projectCard).not.toHaveTextContent('SaaS');
        });
    });
});