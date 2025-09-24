<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReactionRequest;
use App\Models\Reaction;

class ReactionController extends Controller
{
    public function index() {}

    public function store(ReactionRequest $request)
    {
        $validated = $request->validated();

        $newReaction = Reaction::updateOrCreate(
            [
                'blog_id' => $validated['blog_id'],
                'user_id' => $validated['user_id'],
            ],
            [
                'type_id' => $validated['type_id'],
            ]
        );

        return response()->json($newReaction);
    }

    public function show(string $id) {}

    public function update(Request $request, string $id) {}

    public function destroy(string $id) {}
}
