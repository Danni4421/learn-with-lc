<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthorizationError;
use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\CommentReplyRequest;
use App\Models\CommentReply;
use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CommentReplyController extends Controller
{
    public function store(CommentReplyRequest $request, string $postId, string $commentId): JsonResponse
    {
        $comment = PostComment::where(['post_id' => $postId, 'id' => $commentId])->first(); 

        if (!$comment) {
            throw new NotFoundError('Gagal menambahkan balasan, Komentar tidak ditemukan.');
        }

        $user = auth('api')->user();

        $reply = CommentReply::create([
            'id' => Str::uuid(),
            'comment_id' => $commentId,
            'user_id' => $user->id,
            ...$request->getData(),
        ]);

        if (!$reply) {
            throw new ServerError('Terjadi kesalahan pada sistem.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan balasan.',
            'data' => [
                'reply' => $reply,
            ],
        ], 201); 
    }

    public function all(string $postId, string $commentId): JsonResponse
    {
        $replies = CommentReply::select('replies.*')
            ->join('comments', 'comments.id', '=', 'replies.comment_id')
            ->join('posts', 'posts.id', '=', 'comments.post_id')
            ->where(['comments.id' => $commentId, 'posts.id' => $postId])
            ->get();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan balasan',
            'data' => [
                'replies' => $replies,
            ],
        ]);
    }

    public function update(CommentReplyRequest $request, string $postId, string $commentId, string $replyId)
    {
        $post = Post::find($postId);
        
        if (!$post) {
            throw new NotFoundError('Gagal mengubah balasan, Post tidak ditemukan.');
        }

        $comment = PostComment::find($commentId);
        
        if (!$comment) {
            throw new NotFoundError('Gagal mengubah balasan, Komentar tidak ditemukan.');
        }

        $reply = CommentReply::find($replyId);
        
        if (!$reply) {
            throw new NotFoundError('Gagal memperbarui balasan, Balasan tidak ditemukan.');
        }

        $user = auth('api')->user();

        if ($reply->user_id != $user->id) {
            throw new AuthorizationError('Gagal memperbarui balasan, Anda bukan pemilik balasan.');
        }

        $reply->update($request->getData());

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui balasan.',
        ]);
    }

    public function destroy(string $postId, string $commentId, string $replyId)
    {
        $post = Post::find($postId);
        
        if (!$post) {
            throw new NotFoundError('Gagal mengubah balasan, Post tidak ditemukan.');
        }

        $comment = PostComment::find($commentId);
        
        if (!$comment) {
            throw new NotFoundError('Gagal mengubah balasan, Komentar tidak ditemukan.');
        }

        $reply = CommentReply::find($replyId);
        
        if (!$reply) {
            throw new NotFoundError('Gagal memperbarui balasan, Balasan tidak ditemukan.');
        }

        $user = auth('api')->user();

        if ($reply->user_id != $user->id) {
            throw new AuthorizationError('Gagal memperbarui balasan, Anda bukan pemilik balasan.');
        }

        $reply->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus balasan.'
        ]);
    }
}
