<p align="center">
  <a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="200" alt="Laravel Logo"></a>
</p>

# Full-Stack Portfolio Application

This is a comprehensive portfolio application built with a modern technology stack, featuring a headless Laravel API backend and a dynamic React frontend. It includes a secure admin area for managing portfolio projects.

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About The Project

This project serves as a personal portfolio platform, designed to showcase projects in a clean and modern interface. The admin dashboard provides full CRUD (Create, Read, Update, Delete) functionality for project management.

### Built With

*   **Backend:** [Laravel](https://laravel.com/)
*   **Frontend:** [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
*   **Authentication:** [Laravel Sanctum](https://laravel.com/docs/sanctum)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Testing:** [Pest](https://pestphp.com/) (Backend), [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/) (Frontend)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   PHP >= 8.2
*   Composer
*   Node.js & npm
*   A local database (e.g., MySQL, PostgreSQL, SQLite)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your_username/portfolio-fullstack.git
    cd portfolio-fullstack
    ```

2.  **Install backend dependencies:**
    ```sh
    composer install
    ```

3.  **Install frontend dependencies:**
    ```sh
    npm install
    ```

4.  **Set up your environment file:**
    ```sh
    cp .env.example .env
    ```
    Be sure to update the `DB_*` variables in your `.env` file to match your local database credentials.

5.  **Generate an application key:**
    ```sh
    php artisan key:generate
    ```

6.  **Run database migrations and seeders:**
    This will create the necessary tables and populate them with initial data (including a default admin user).
    ```sh
    php artisan migrate --seed
    ```

7.  **Run the development servers:**
    This command uses `concurrently` to start the Laravel server, Vite dev server, and queue worker.
    ```sh
    composer run dev
    ```

You can now access the application at `http://127.0.0.1:8000`.

## Testing

This project has a comprehensive test suite for both the backend and frontend.

*   **Run Backend (Pest) Tests:**
    ```bash
    composer test
    ```

*   **Run Frontend (Vitest) Tests:**
    ```bash
    npm test
    ```
    Or, for an interactive UI:
    ```bash
    npm run test:ui
    ```

## Server Management & Deployment Notes

This section contains helpful commands for maintaining the remote server.

### Database

To seed the database with specific data on a remote server:
```bash
php artisan db:seed --class=ProjectSeeder --force
php artisan db:seed --class=UserSeeder --force
```
 
To create a database backup on the remote server:
```bash
cd /home/ubuntu/
mysqldump -u ubuntu -p --no-tablespaces portfolio > pre_seed_backup.sql
```
 
### Updating Application Caches (Remote Server)
 
When deploying new code, it's important to clear and refresh Laravel's caches to ensure changes are applied.
 
```bash
cd /var/www/portfolio
 
# Clear the route cache
sudo php artisan route:clear
 
# Clear the config cache (good practice during deployment)
sudo php artisan config:clear
 
# Optimize everything again (re-caches routes and config)
sudo php artisan optimize
```
 
### Deploying Frontend Build
 
1.  **On your local machine**, build the frontend assets and securely copy them to the remote server:
    ```bash
    npm run build
    scp -r -i ~/Downloads/ssh-key.key public/build ubuntu@40.233.117.240:~/new-build
    ```
 
2.  **On the remote server**, back up the old build directory and replace it with the new one:
    ```bash
    cd /var/www/portfolio/public
 
    # Backup the current build directory with a timestamp
    if [ -d "build" ]; then
        sudo mv build "build_backup_$(date +%Y%m%d_%H%M%S)"
    fi
 
    # Move the new build into place
    sudo mv ~/new-build ./build
 
    # Set correct permissions
    sudo chmod -R 775 build
    sudo chown -R ubuntu:www-data build
    ```
 
### API Testing
 
To test the login endpoint and retrieve an authentication token, use `curl`:
```bash
curl -X POST https://portfolio.joelwiebe.ca/api/login \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"email": "admin@example.com", "password": "password"}'
```
 
### Environment Configuration
 
To edit the environment variables on the remote server:
```bash
vim /var/www/portfolio/.env
```
 
### File Permissions
 
To ensure web-accessible files like `robots.txt` and `sitemap.xml` have the correct permissions on the remote server:
```bash
sudo chown ubuntu:www-data public/robots.txt
sudo chown ubuntu:www-data public/sitemap.xml
chmod 644 public/robots.txt
chmod 644 public/sitemap.xml
```
