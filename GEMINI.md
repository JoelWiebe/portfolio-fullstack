# Gemini Project: Full Stack Portfolio App

This document provides context for the Gemini CLI to assist in the development of a full-stack portfolio application.

## Project Goal

The primary goal is to complete the Admin Dashboard functionality, allowing the user to manage their portfolio projects.

## Technology Stack

*   **Backend:** Laravel 10 (acting as a headless API)
*   **Frontend:** React 18 (using Vite)
*   **Authentication:** Laravel Sanctum (token-based)

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
    *   `index`: List all projects.
    *   `store`: Create a new project.
    *   `show`: Retrieve a single project.
    *   `update`: Update an existing project.
    *   `destroy`: Delete a project.
*   `ProjectRequest` is used for validating incoming data for `store` and `update` operations.
*   API routes are secured and require authentication.

### Frontend

*   `react-router-dom` is used for routing.
*   A protected route is configured for `/admin`.
*   The `Login.jsx` component successfully authenticates users and stores the authentication token in local storage.

