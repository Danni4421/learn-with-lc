<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\PostCommentRequest;
use App\Http\Requests\StorePostCommentFileRequest;
use App\Models\CommentFile;
use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
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
        $post = Post::find($postId);

        if (!$post) {
            throw new NotFoundError('Gagal menambahkan komentar, Post tidak ditemukan.');
        }

        $comment = $request->store_comment($postId);

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
     * Post a new comment file
     * 
     * @param \App\Http\Requests\StorePostCommentFileRequest $request
     * @param string $postId
     * @param string $commentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store_comment_file(StorePostCommentFileRequest $request, string $postId, string $commentId): JsonResponse
    {
        $post = Post::find($postId);

        if (!$post) {
            throw new NotFoundError('Gagal menambahkan comment file, Post tidak ditemukan.');
        }

        $comment = PostComment::find($commentId);

        if (!$comment) {
            throw new NotFoundError('Gagal menambahkan comment file, Comment tidak ditemukan.');
        }

        $commentFile = $request->storeIntoComment($commentId);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan comment file.',
            'data' => [
                'comment_file' => $commentFile,
            ],
        ]);
    }

    /**
     * Retrieve all post comments
     * 
     * @param string $postId
     * @return JsonResponse
     */
    public function all(string $postId): JsonResponse
    {
        $comments = PostComment::with(['comment_files'])->where(['post_id' => $postId])->get();

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

    public function destroy_comment_files(string $postId, string $commentId, string $fileId)
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' => $commentId])->first();

        if (!$comment) {
            throw new NotFoundError('Gagal menghapus komentar, Komentar tidak ditemukan.');
        }

        if ($comment->user_id != auth('api')->user()->id) {
            throw new AuthorizationError('Gagal menghapus komentar, Anda bukan pemilik komentar.');
        }

        $comment_file = CommentFile::find($fileId);        

        if (!$comment_file) {
            throw new NotFoundError('Gagal menghapus file comment, File tidak ditemukan');
        }

        $comment_file_name = last(explode('/', $comment_file->path));

        Storage::delete('comment_files/' . $comment_file_name);

        $comment_file->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus file comment.',
        ]);
    }
}
