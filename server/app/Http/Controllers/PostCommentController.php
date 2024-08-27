<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\PostCommentRequest;
use App\Models\PostComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PostCommentController extends Controller
{
    /**
     * Store a new comment
     * 
     * @param PostCommentRequest $request
     * @param string $postId
     * @throws ServerError
     * @return JsonResponse
     */
    public function store(PostCommentRequest $request, string $postId): JsonResponse
    {
        $user = auth('api')->user();

        $comment = PostComment::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'post_id' => $postId,
            ...$request->getData(),
        ]);

        if (!$comment) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan comment.',
            'data' => [
                'comment' => $comment,
            ],
        ], 201);
    }

    /**
     * Retrieve all post comments
     * 
     * @param string $postId
     * @return JsonResponse
     */
    public function all(string $postId): JsonResponse
    {
        $comments = PostComment::where(['post_id' => $postId])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan komentar post.',
            'data' => [
                'comments' => $comments
            ],
        ]);
    }

    /**
     * Retrieve comment base on post
     * 
     * @param string $postId
     * @param string $commentId
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $postId, string $commentId): JsonResponse
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' =>  $commentId])->first();

        if (!$comment) {
            throw new NotFoundError('Gagal mendapatkan komentar, Komentar tidak ditemukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan komentar.',
            'data' => [
                'comment' => $comment,
            ]
        ]);
    }

    /**
     * Update comment based on post
     * 
     * @param PostCommentRequest $request
     * @param string $postId
     * @param string $commentId
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function update(PostCommentRequest $request, string $postId, string $commentId): JsonResponse
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' => $commentId])->first();

        if (!$comment) {
            throw new NotFoundError('Gagal mengubah komentar, Komentar tidak ditemukan.');
        }

        if ($comment->user_id != auth('api')->user()->id) {
            throw new AuthorizationError('Gagal mengubah komentar, Anda bukan pemilik komentar.');
        }

        $comment->update($request->getData());

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui komentar.',
        ]);
    }

    /**
     * Delete comment based on post
     * 
     * @param string $postId
     * @param string $commentId
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function destroy(string $postId, string $commentId): JsonResponse
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' => $commentId])->first();

        if (!$comment) {
            throw new NotFoundError('Gagal menghapus komentar, Komentar tidak ditemukan.');
        }

        if ($comment->user_id != auth('api')->user()->id) {
            throw new AuthorizationError('Gagal mengubah komentar, Anda bukan pemilik komentar.');
        }

        $comment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus komentar.'
        ]);
    }
}