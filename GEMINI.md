# Gemini Project: Full Stack Portfolio App

This document provides context for the Gemini CLI to assist in the development of a full-stack portfolio application.

## Project Goal

The primary goal is to complete the Admin Dashboard functionality, allowing the user to manage their portfolio projects.

## Technology Stack

*   **Backend:** Laravel 10 (acting as a headless API)
*   **Frontend:** React 19 (using Vite)
*   **Authentication:** Laravel Sanctum

## Current Project State

### Architecture

*   The application is structured as a Single Page Application (SPA) with a separate backend API.
*   Laravel provides the API endpoints.
*   React handles the user interface.
*   Authentication is managed through tokens with Laravel Sanctum.

### Database

*   A `projects` table exists.
*   It contains JSON columns for `tags`, `categories`, and `links`.
*   The `Project` Eloquent model automatically casts these JSON fields to arrays.

### API

*   A `ProjectController` is in place with the following RESTful methods:
    *   `index`, `store`, `show`, `update`, `destroy`.
*   `ProjectRequest` is used for validating incoming data for `store` and `update` operations.
*   API routes are secured and require authentication.

### Frontend

*   `react-router-dom` is used for routing.
*   A protected route is configured for the `/admin` dashboard.
*   The `Login.jsx` component successfully authenticates users and stores the authentication token in local storage.
*   The `AdminDashboard.jsx` component provides full CRUD functionality for projects. It fetches, displays, creates, updates, and deletes projects.
*   The `ProjectForm.jsx` component is a reusable and accessible modal form for creating and editing projects, with complex internal state management.
*   A reusable `Button.jsx` component has been created.

### Testing

*   **Backend (Pest):**
    *   A comprehensive test suite exists for the `ProjectController`, covering all CRUD actions.
    *   Validation tests are in place for the `ProjectRequest`, ensuring data integrity for project creation and updates.
*   **Frontend (Vitest & React Testing Library):**
    *   The test environment is fully configured with `jsdom` and a `setup.js` file for global test helpers.
    *   The `Button` and `ProjectForm` components are fully unit-tested.
    *   The `AdminDashboard` component has a full suite of integration tests covering the entire CRUD lifecycle, with API calls mocked using `vi.spyOn(window, 'fetch')`.
