<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function() {
    Route::post('/register', [RegisteredUserController::class, 'register'])
        ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'login'])
        ->name('login');

    Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])
        ->middleware('auth:api')
        ->name('logout');

    Route::put('/refresh', [AuthenticatedSessionController::class, 'refresh'])
        ->middleware('auth:api')
        ->name('refresh');

    Route::get('/me', [AuthenticatedSessionController::class, 'me'])
        ->middleware('auth:api')
        ->name('me');
});