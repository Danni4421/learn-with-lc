<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\LBBController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->group(function() {

    Route::get('/lbb', [LBBController::class, 'show'])->name('lbb.show');
    Route::get('/levels', [LevelController::class, 'all'])->name('level.all');
    Route::get('/programs', [ProgramController::class, 'all'])->name('program.all');
    Route::get('/programs/{id}', [ProgramController::class, 'show'])->name('program.show');
    Route::get('/teachers', [TeacherController::class, 'all'])->name('teacher.all');
    Route::get('/teachers/{id}', [TeacherController::class, 'show'])->name('teacher.show');
    Route::get('/faqs', [FAQController::class, 'all'])->name('faq.all');
    Route::get('/faqs/{id}', [FAQController::class, 'show'])->name('faq.show');

    Route::middleware(['auth:api', 'role:administrator'])->group(function() {
        Route::prefix('level')->group(function() {
            Route::post('/', [LevelController::class, 'store'])->name('level.store');
            Route::delete('/{id}', [LevelController::class, 'destroy'])->name('level.delete');
        });

        Route::prefix('lbb')->group(function() {
            Route::post('/activities', [LBBController::class, 'store_activities'])->name('lbb.activities.store');
            Route::put('/', [LBBController::class, 'update_hero'])->name('lbb.update');
            Route::delete('/activities/{id}', [LBBController::class, 'destroy_activity'])->name('lbb.activities.delete');
        });
    
        Route::prefix('programs')->group(function() {
            Route::post('/', [ProgramController::class, 'store'])->name('program.store');
            Route::put('/{id}', [ProgramController::class, 'update'])->name('program.update');
            Route::delete('/{id}', [ProgramController::class, 'destroy'])->name('program.delete');
        });

        Route::prefix('teachers')->group(function() {
            Route::post('/', [TeacherController::class, 'store'])->name('teacher.store');
            Route::put('/{id}', [TeacherController::class, 'update'])->name('teacher.update');
        });

        Route::prefix('faqs')->group(function() {
            Route::post('/', [FAQController::class, 'store'])->name('faq.store');
            Route::put('/{id}', [FAQController::class, 'update'])->name('faq.update');
            Route::delete('/{id}', [FAQController::class, 'destroy'])->name('faq.delete');
        });
    });

    Route::prefix('auth')->group(function() {
        Route::post('/register', [RegisteredUserController::class, 'register'])->name('register');
        Route::post('/login', [AuthenticatedSessionController::class, 'login'])->name('login');
        Route::post('/logout', [AuthenticatedSessionController::class, 'logout'])->middleware('auth:api')->name('logout');
        Route::put('/refresh', [AuthenticatedSessionController::class, 'refresh'])->middleware('auth:api')->name('refresh');
        Route::post('/me', [AuthenticatedSessionController::class, 'me'])->middleware('auth:api')->name('me');
    });
});

