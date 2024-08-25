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
        Schema::create('replies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('comment_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->text('reply');
            $table->timestamps();

            $table->foreign('comment_id')->references('id')->on('comments')
                ->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('replies', function (Blueprint $table) {
            $table->dropForeign('replies_comments_foreign');
            $table->dropForeign('replies_users_foreign');
        });
        Schema::dropIfExists('replies');
    }
};
