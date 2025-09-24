<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ReactionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('blog', BlogController::class);
Route::apiResource('reaction', ReactionController::class);
