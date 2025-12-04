<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsAdmin; 

/*
|--------------------------------------------------------------------------
| Public Routes (No Login Required)
|--------------------------------------------------------------------------
| These routes are accessible to everyone, including your portfolio frontend.
*/

// Fetch all projects (The main portfolio feed)
Route::get('/projects', [ProjectController::class, 'index']);

// Fetch a single project detail
Route::get('/projects/{project}', [ProjectController::class, 'show']);

// Admin Login endpoint (Returns the API Token)
Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| Protected Routes (Requires Bearer Token)
|--------------------------------------------------------------------------
| These routes require the 'Authorization: Bearer <token>' header.
*/

Route::middleware(['auth:sanctum', IsAdmin::class])->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    
    // Admin Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Auth Check helper (Good for verifying token validity)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});