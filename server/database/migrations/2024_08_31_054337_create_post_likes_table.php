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
        Schema::create('post_likes', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('post_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->timestamps();

            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
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
        Schema::table('post_likes', function (Blueprint $table) {
            $table->dropForeign('post_likes_posts_foreign');
            $table->dropForeign('post_likes_users_foreign');
        });
        Schema::dropIfExists('post_likes');
    }
};
