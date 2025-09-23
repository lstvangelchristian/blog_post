<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogRequest;
use App\Http\Resources\BlogResource;
use App\Models\Blog;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with(['author', 'reactions', 'comments'])->latest()->get();

        return BlogResource::collection($blogs);
    }

    public function store(BlogRequest $request)
    {
        $createdBlog = Blog::create($request->validated());

        return response()->json($createdBlog);
    }

    public function show(string $id) {}

    public function update(Request $request, string $id) {}

    public function destroy(string $id) {}
}
