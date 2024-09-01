<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comment_likes', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('comment_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->timestamps();

            $table
                ->foreign('comment_id')
                ->references('id')
                ->on('comments')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comment_likes', function (Blueprint $table) {
            $table->dropForeign('comment_likes_posts_foreign');
            $table->dropForeign('comment_likes_users_foreign');
        });
        Schema::dropIfExists('comment_likes');
    }
};
