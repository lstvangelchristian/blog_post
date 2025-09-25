<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Author;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function registerAuthor(RegisterRequest $request)
    {
        $validated = $request->validated();

        $newAuthor = [
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
        ];

        $newAuthor = Author::create($newAuthor);

        return response()->json($newAuthor);
    }
}
