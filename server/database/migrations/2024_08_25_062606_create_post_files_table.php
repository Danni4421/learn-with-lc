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
        Schema::create('post_files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('post_id')->index();
            $table->text('path');
            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('posts')   
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_files', function (Blueprint $table) {
            $table->dropForeign('post_files_posts_foreign');
        });
        Schema::dropIfExists('post_files');
    }
};
