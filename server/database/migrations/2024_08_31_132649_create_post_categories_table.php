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
        Schema::create('post_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description');
            $table->timestamps();
        });

        Schema::create('category_posts', function (Blueprint $table) {
            $table->id();
            $table->uuid('post_category_id')->index();
            $table->uuid('post_id')->index();
            $table->timestamps();

            $table
                ->foreign('post_category_id')
                ->references('id')
                ->on('post_categories')
                ->cascadeOnDelete();
                
            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_categories');
        
        Schema::table('category_posts', function (Blueprint $table) {
            $table->dropForeign('category_posts_post_categories_foreign');
            $table->dropForeign('category_posts_posts_foreign');
        });
        Schema::dropIfExists('category_posts');
    }
};
