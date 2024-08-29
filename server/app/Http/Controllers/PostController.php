<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\Post\PutPostRequest;
use App\Http\Requests\Post\StorePostRequest;
use App\Models\Post;
use App\Models\PostFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Store new post
     * 
     * @param StorePostRequest $request
     * @throws ServerError
     * @return JsonResponse
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        $post = $request->store_post();

        if (!$post) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan post.',
            'data' => [
                'post' => $post,
            ]
        ], 201);
    }

    /**
     * Get all post
     * 
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $posts = Post::with(['comments.replies', 'post_owner', 'files'])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan posts.',
            'data' => [
                'posts' => $posts,
            ]
        ]);
    }

    /**
     * Get post by specific id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {   
        $post = Post::with(['comments.replies', 'post_owner', 'files'])->find($id);

        if (!$post) {
            throw new NotFoundError('Gagal mendapatkan post, Post tidak ditemukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan post.',
            'data' => [
                'post' => $post,
            ]
        ]);
    }

    /**
     * Update post by specific id
     * 
     * @param PutPostRequest $request
     * @param string $id
     * @throws NotFoundError | AuthorizationError
     * @return JsonResponse
     */
    public function update(PutPostRequest $request, string $id): JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            throw new NotFoundError('Gagal mengubah post, Post tidak ditemukan.');
        }

        if ($post->user_id != auth('api')->user()->id) {
            throw new AuthorizationError('Anda tidak diperbolehkan mengubah post.');
        }

        $post->update($request->getData());
 
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengubah post.'
        ]);
    }

    /**
     * Delete post by specific id
     * 
     * @param string $id
     * @throws NotFoundError | AuthorizationError
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $post = Post::find($id);

        if (!$post) {
            throw new NotFoundError('Gagal menghapus post, Post tidak ditemukan.');
        }

        $user = auth('api')->user();

        if ($post->user_id != $user->id) {
            throw new AuthorizationError('Anda tidak diperbolehkan mengubah post.');
        }

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus post.'
        ]);
    }

    public function destroy_post_files(string $postId, string $fileId)
    {
        $post = Post::with(['files'])->find($postId);

        if (!$post) {
            throw new NotFoundError('Gagal menghapus file post, Post tidak ditemukan');
        }

        $user = auth('api')->user();

        if ($post->user_id != $user->id) {
            throw new AuthorizationError('Anda tidak diperbolehkan mengubah post.');
        }

        $post_file = PostFile::find($fileId);

        if (!$post_file) {
            throw new NotFoundError('Gagal menghapus file post, Post tidak ditemukan.');
        }

        $post_file_name = last(explode('/', $post_file->path));

        Storage::drive('public')->delete('post_files/' . $post_file_name);

        $post_file->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus file post.'
        ]);
    }
}
