<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CommentReplyController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\LBBController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\TestimonyController;
use App\Models\PostComment;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->group(function() {

    /**
     * Public Routes
     */
        Route::get('/lbb', [LBBController::class, 'show'])->name('lbb.show');
        Route::get('/levels', [LevelController::class, 'all'])->name('level.all');
        Route::get('/programs', [ProgramController::class, 'all'])->name('program.all');
        Route::get('/programs/{id}', [ProgramController::class, 'show'])->name('program.show');
        Route::get('/teachers', [TeacherController::class, 'all'])->name('teacher.all');
        Route::get('/teachers/{id}', [TeacherController::class, 'show'])->name('teacher.show');
        Route::get('/testimonials', [TestimonyController::class, 'all'])->name('teacher.all');
        Route::get('/testimonials/{id}', [TestimonyController::class, 'show'])->name('teacher.show');
        Route::get('/faqs', [FAQController::class, 'all'])->name('faq.all');
        Route::get('/faqs/{id}', [FAQController::class, 'show'])->name('faq.show');

        Route::get('posts', [PostController::class, 'all'])->name('posts.all');
        Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');
        Route::get('/posts/{postId}/comments', [PostCommentController::class, 'all'])->name('posts.comments.all');
        Route::get('/posts/{postId}/comments/{commentId}', [PostCommentController::class, 'show'])->name('posts.comments.show');
        Route::get('/posts/{postId}/comments/{commentId}/replies', [CommentReplyController::class, 'all'])->name('posts.comments.replies.all');

        Route::get('/user/{username}', [AccountController::class, 'showByUsername'])->name('user.show.by.username');
    /** 
     * End Public Routes
     */

    /**
     * Authenticated Routes
     */
        /**
         * Only user with public and student role can access this routes
         */
        Route::middleware(['auth:api', 'role:public,student'])->group(function() {
            Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
            Route::post('/posts/{postId}/files', [PostController::class, 'store_post_file'])->name('posts.files.store');
            Route::post('/posts/{postId}/like', [PostController::class, 'like'])->name('posts.like.store');
            Route::post('/posts/{postId}/dislike', [PostController::class, 'dislike'])->name('posts.dislike.store');
            Route::post('/posts/{postId}/comments', [PostCommentController::class, 'store'])->name('posts.comments.store');
            Route::post('/posts/{postId}/comments/{commentId}/files', [PostCommentController::class, 'store_comment_file'])->name('posts.comments.files.store');
            Route::post('/posts/{postId}/comments/{commentId}/like', [PostCommentController::class, 'like'])->name('posts.comments.like.store');
            Route::post('/posts/{postId}/comments/{commentId}/dislike', [PostCommentController::class, 'dislike'])->name('posts.comments.dislike.store');
            Route::post('/posts/{postId}/comments/{commentId}/replies', [CommentReplyController::class, 'store'])->name('posts.comments.replies.store');
            Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
            Route::put('/posts/{postId}/comments/{commentId}', [PostCommentController::class, 'update'])->name('posts.comments.update');
            Route::put('/posts/{postId}/comments/{commentId}/replies/{replyId}', [CommentReplyController::class, 'update'])->name('posts.comments.replies.update');
        });
        
        /**
         * All role can be access this routes
         */
        Route::middleware(['auth:api', 'role:all'])->group(function() {
            Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.delete');
            Route::delete('/posts/{postId}/files/{fileId}', [PostController::class, 'destroy_post_files'])->name('posts.files.destroy');
            Route::delete('/posts/{postId}/comments/{commentId}', [PostCommentController::class, 'destroy'])->name('posts.comments.delete');
            Route::delete('/posts/{postId}/comments/{commentId}/files/{fileId}', [PostCommentController::class, 'destroy_comment_files'])->name('posts.comments.files.destroy');
            Route::delete('/posts/{postId}/comments/{commentId}/replies/{replyId}', [CommentReplyController::class, 'destroy'])->name('posts.comments.destroy');
        });
    /**
     * End Authenticated Routes
     */

    /**
     * Administrator Routes
     */
        Route::middleware(['auth:api', 'role:administrator'])->group(function() {
            Route::prefix('posts/categories')->group(function () {
                Route::post('/', [PostCategoryController::class, 'store'])->name('posts.categories.store');
                Route::get('/', [PostCategoryController::class, 'all'])->name('posts.categories.all');
                Route::put('/{postCategoryId}', [PostCategoryController::class, 'update'])->name('posts.categories.update');
                Route::delete('/{postCategoryId}', [PostCategoryController::class, 'destroy'])->name('posts.categories.delete');
            });

            Route::prefix('levels')->group(function() {
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
                Route::delete('/{id}', [TeacherController::class, 'destroy'])->name('teacher.delete');
            });

            Route::prefix('testimonials')->group(function() {
                Route::post('/', [TestimonyController::class, 'store'])->name('testimony.store');
                Route::put('/{id}', [TestimonyController::class, 'update'])->name('testimony.update');
                Route::delete('/{id}', [TestimonyController::class, 'destroy'])->name('testimony.delete');
            });

            Route::prefix('faqs')->group(function() {
                Route::post('/', [FAQController::class, 'store'])->name('faq.store');
                Route::put('/{id}', [FAQController::class, 'update'])->name('faq.update');
                Route::delete('/{id}', [FAQController::class, 'destroy'])->name('faq.delete');
            });
        });
    /**
     * End Administrator Routes
     */
});

require __DIR__ . '/auth.php';
