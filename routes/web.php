<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// 1. Define specific backend routes first (if any exist)
// ...

// 2. The Catch-All Route (Must be last)
// This tells Laravel: "For ANY URL that isn't an API route or an asset, 
// just return the 'welcome' view where React lives."
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');