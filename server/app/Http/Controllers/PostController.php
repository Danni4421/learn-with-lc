<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\InvariantError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Models\Post;
use App\Models\PostFile;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\PutPostRequest;
use App\Http\Requests\StorePostCommentFileRequest;
use App\Models\PostLike;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Store new post
     * 
     * @param \App\Http\Requests\Post\StorePostRequest $request
     * @throws \App\Exceptions\ServerError
     * @return \Illuminate\Http\JsonResponse
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
     * Store a new post file
     * 
     * @param \App\Http\Requests\StorePostCommentFileRequest $request
     * @param string $postId
     * @throws \App\Exceptions\NotFoundError
     * @return \Illuminate\Http\JsonResponse
     */
    public function store_post_file(StorePostCommentFileRequest $request, string $postId): JsonResponse
    {
        $post = Post::find($postId);

        if (!$post) {
            throw new NotFoundError('Gagal menambahkan file post, Post tidak ditemukan.');
        }

        $postFile = $request->storeIntoPost($postId);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan file post.',
            'data' => [
                'post_file' => $postFile
            ]
        ], 201);
    }

    /**
     * Like of post
     * 
     * @param string $postId
     * @throws \App\Exceptions\InvariantError
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(string $postId): JsonResponse
    {
        $user = auth('api')->user();

        $isPostLiked = PostLike::where(['post_id' => $postId, 'user_id' => $user->id])->first();

        if ($isPostLiked) {
            throw new InvariantError('Gagal menyukai post, Anda sudah menyukai post tersebut.');
        }

        PostLike::create([
            'id' => Str::uuid(),
            'post_id' => $postId,
            'user_id' => $user->id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menyukai post.'
        ], 201);
    }

    /**
     * Dislike of post
     * 
     * @param string $postId
     * @throws \App\Exceptions\NotFoundError
     * @return \Illuminate\Http\JsonResponse
     */
    public function dislike(string $postId): JsonResponse
    {
        $user = auth('api')->user();

        $postLike = PostLike::where(['post_id' => $postId, 'user_id' => $user->id])->first();

        if (!$postLike) {
            throw new NotFoundError('Gagal tidak menyukai post, Anda belum menyukai post.');
        }

        $postLike->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil tidak menyukai post.'
        ]);
    }

    /**
     * Get all Post
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(): JsonResponse
    {
        $posts = Post::with(['comments.replies', 'post_owner', 'files'])
            ->withCount('comments', 'post_likes')->get();

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
     * @throws \App\Exceptions\NotFoundError
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {   
        $post = Post::with(['comments.replies', 'post_owner', 'files'])
            ->withCount('comments', 'post_likes')->find($id);

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
     * @param \App\Http\Requests\Post\PutPostRequest $request
     * @param string $id
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return \Illuminate\Http\JsonResponse
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
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return \Illuminate\Http\JsonResponse
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

    /**
     * Delete post by specific id
     * 
     * @param string $postId
     * @param string $fileId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy_post_files(string $postId, string $fileId): JsonResponse
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
