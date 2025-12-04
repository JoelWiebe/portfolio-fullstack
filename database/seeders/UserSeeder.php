<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Check if user exists to avoid duplicates
        if (!User::where('email', 'me@joelwiebe.ca')->exists()) {
            User::create([
                'name' => 'Joel Wiebe',
                'email' => 'me@joelwiebe.ca',
                // Use the environment variable 'ADMIN_PASSWORD', or fallback to 'password' if missing
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
                'role' => 'admin', // Assign the admin role
            ]);
        }
    }
}