<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\InvariantError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\Thread\Comment\PostCommentRequest;
use App\Http\Requests\Thread\PostThreadCommentFileRequest;
use App\Models\CommentFile;
use App\Models\CommentLike;
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
     * @param \App\Http\Requests\Thread\Comment\PostCommentRequest $request
     * @param string $postId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\ServerError
     * @return \Illuminate\Http\JsonResponse
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
     * @param \App\Http\Requests\Thread\PostThreadCommentFileRequest $request
     * @param string $postId
     * @param string $commentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store_comment_file(PostThreadCommentFileRequest $request, string $postId, string $commentId): JsonResponse
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
     * Like a comment
     * 
     * @param string $postId
     * @param string $commentId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\InvariantError
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(string $postId, string $commentId): JsonResponse
    {
        $user = auth('api')->user();

        $isPostExists = Post::find($postId);

        if (!$isPostExists) {
            throw new NotFoundError('Gagal menyukai komentar, Post tidak ditemukan.');
        }

        $isCommentExists = PostComment::find($commentId);

        if (!$isCommentExists) {
            throw new NotFoundError('Gagal menyukai komentar, Komentar tidak ditemukan.');
        }

        $isCommentAlreadyLiked = CommentLike::where(['comment_id' => $commentId, 'user_id' => $user->id])->first();

        if ($isCommentAlreadyLiked) {
            throw new InvariantError('Gagal menyukai komentar, Komentar sudah Anda sukai.');
        }

        CommentLike::create([
            'id' => Str::uuid(),
            'comment_id' => $commentId,
            'user_id' => $user->id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan komentar ke Anda sukai.',
        ]);
    }

    /**
     * Dislike a comment
     * 
     * @param string $postId
     * @param string $commentId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\InvariantError
     * @return \Illuminate\Http\JsonResponse
     */
    public function dislike(string $postId, string $commentId): JsonResponse
    {
        $user = auth('api')->user();

        $isPostExists = Post::find($postId);

        if (!$isPostExists) {
            throw new NotFoundError('Gagal tidak menyukai komentar, Post tidak ditemukan.');
        }

        $isCommentExists = PostComment::find($commentId);

        if (!$isCommentExists) {
            throw new NotFoundError('Gagal tidak menyukai komentar, Komentar tidak ditemukan.');
        }

        $commentLike = CommentLike::where(['comment_id' => $commentId, 'user_id' => $user->id])->first();

        if (!$commentLike) {
            throw new InvariantError('Gagal tidak menyukai komentar, Komentar sudah Anda sukai.');
        }
        
        $commentLike->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil tidak menyukai komentar.'
        ]);
    }

    /**
     * Retrieve all comment post
     * 
     * @param string $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(string $postId): JsonResponse
    {
        $comments = PostComment::with(['comment_files'])
            ->where(['post_id' => $postId])
            ->withCount('replies', 'comment_likes')
            ->get();

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
     * @throws \App\Exceptions\NotFoundError
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $postId, string $commentId): JsonResponse
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' =>  $commentId])
            ->withCount('replies', 'comment_likes')
            ->first();

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
     * @param \App\Http\Requests\Thread\Comment\PostCommentRequest $request
     * @param string $postId
     * @param string $commentId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return \Illuminate\Http\JsonResponse
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
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return \Illuminate\Http\JsonResponse
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

    /**
     * Delete comment file
     * 
     * @param string $postId
     * @param string $commentId
     * @param string $fileId
     * @throws \App\Exceptions\NotFoundError
     * @throws \App\Exceptions\AuthorizationError
     * @return JsonResponse|mixed
     */
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

        $comment_file->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus file comment.',
        ]);
    }
}
