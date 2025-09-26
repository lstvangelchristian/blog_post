<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ReactionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('blog', BlogController::class);
Route::apiResource('reaction', ReactionController::class);
Route::apiResource('comment', CommentController::class);

Route::post('register', [RegisterController::class, 'registerAuthor']);
Route::post('login', [LoginController::class, 'login']);
