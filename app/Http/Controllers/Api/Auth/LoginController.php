<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $author = Author::where('username', $validated['username'])->first();

        if ($author && Hash::check($validated['password'], $author->password)) {
            return response()->json([
                'success' => true,
                'data' => $author,
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'Incorrect Credentials',
        ]);
    }
}
