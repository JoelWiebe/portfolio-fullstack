<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Delete old tokens (optional, keeps it clean)
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('admin-token')->plainTextToken;

        // Set session duration (e.g., 30 days in minutes)
        $minutes = 30 * 24 * 60;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user
        ])->withCookie(cookie(
            'portfolio_token', // Cookie name
            $token,             // Token value
            $minutes,           // Duration
            '/',                // Path
            null,               // Domain
            config('app.env') === 'production', // `secure` flag
            true,               // `httpOnly` flag
            false,              // `raw`
            'lax'               // `sameSite` attribute
        ));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out'])->withCookie(Cookie::forget('portfolio_token'));
    }
}