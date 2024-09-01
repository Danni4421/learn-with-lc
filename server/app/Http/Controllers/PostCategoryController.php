<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\Thread\Category\PostThreadCategoryRequest;
use App\Http\Requests\Thread\Category\PutThreadCategoryRequest;
use App\Models\PostCategory;
use Illuminate\Http\JsonResponse;

class PostCategoryController extends Controller
{
    /**
     * Store a new post category
     * 
     * @param \App\Http\Requests\Thread\Category\PostThreadCategoryRequest $request
     * @throws \App\Exceptions\ServerError
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PostThreadCategoryRequest $request): JsonResponse
    {
        $postCategory = $request->storePostCategory();

        if (!$postCategory) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan kategori post.',
            'data' => [
                'post_category' => $postCategory
            ]
        ], 201);
    }

    /**
     * Retrieve all post categories
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(): JsonResponse
    {
        $postCategories = PostCategory::all();

        return response()->json([
            'status' => 'succes',
            'message' => 'Berhasil mendapatkan kategori post.',
            'data' => [
                'post_categories' => $postCategories
            ] 
        ]);
    }

    /**
     * Update post category
     * 
     * @param \App\Http\Requests\Thread\Category\PutThreadCategoryRequest $request
     * @param string $postCategoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(PutThreadCategoryRequest $request, string $postCategoryId): JsonResponse
    {
        $request->updatePostCategory($postCategoryId);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengubah kategori post.'
        ]);
    }

    /**
     * Delete post category
     * 
     * @param string $postCategoryId
     * @throws \App\Exceptions\NotFoundError
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $postCategoryId): JsonResponse
    {
        $postCategory = PostCategory::find($postCategoryId);

        if (!$postCategory) {
            throw new NotFoundError('Gagal menghapus kategori post, Kategori tidak ditemukan.');
        }

        $postCategory->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus kategori post.'
        ]);
    }
}
