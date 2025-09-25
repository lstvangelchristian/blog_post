<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('login');
})->name('show.login');

Route::get('register', function () {
    return view('register');
})->name('show.register');

Route::get('public-feed', function () {
    return view('public-feed');
})->name('show.public-feed');
