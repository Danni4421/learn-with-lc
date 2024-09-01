<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentationController extends Controller
{
    protected $documentation;

    public function __construct()
    {
        $this->documentation = (object) array_map(function ($file) {
            return json_encode(json_decode(file_get_contents(storage_path($file)), true), JSON_PRETTY_PRINT);
        }, [
            "lbb" => "/app/api-responses/lbb-information.json",

            // Levels
            "available_levels" => "/app/api-responses/levels/available-levels.json",
            "post_level" => "app/api-responses/levels/post-level.json",
            "delete_level" => "app/api-responses/levels/delete-level.json",

            // Register User and Authentication
            "register_user" => "/app/api-responses/users/register-user.json",
            "login_user" => "/app/api-responses/users/login-user.json",
            "logged_user" => "/app/api-responses/users/logged-user.json",
            "get_user_by_username" => "/app/api-responses/users/get-user-by-username.json",

            // Programs
            "post_program" => "/app/api-responses/programs/post-program.json",
            "get_all_program" => "/app/api-responses/programs/get-all-program.json",
            "get_program_by_id" => "/app/api-responses/programs/get-program-by-id.json",
            "update_program_by_id" => "/app/api-responses/programs/update-program-by-id.json",
            "delete_program_by_id" => "/app/api-responses/programs/delete-program-by-id.json",

            // Activities
            "post_activity" => "/app/api-responses/activities/post-activity.json",
            "delete_activity" => "/app/api-responses/activities/delete-activity.json",

            // Teachers
            "post_teacher" => "/app/api-responses/teachers/post-teacher.json",
            "get_all_teacher" => "/app/api-responses/teachers/get-all-teacher.json",
            "get_teacher_by_id" => "/app/api-responses/teachers/get-teacher-by-id.json",
            "update_teacher" => "/app/api-responses/teachers/update-teacher.json",
            "delete_teacher" => "/app/api-responses/teachers/delete-teacher.json",
            
            // Testimonials
            "post_testimony" => "/app/api-responses/testimonials/post-testimony.json",
            "get_all_testimonial" => "/app/api-responses/testimonials/get-all-testimony.json",
            "get_testimony_by_id" => "/app/api-responses/testimonials/get-testimony-by-id.json",
            "update_testimony" => "/app/api-responses/testimonials/update-testimony.json",
            "delete_testimony" => "/app/api-responses/testimonials/delete-testimony.json",

            // FAQs
            "post_faq" => "/app/api-responses/faqs/post-faq.json",
            "get_all_faq" => "/app/api-responses/faqs/get-all-faq.json",
            "get_faq_by_id" => "/app/api-responses/faqs/get-faq-by-id.json",
            "update_faq" => "/app/api-responses/faqs/update-faq.json",
            "delete_faq" => "/app/api-responses/faqs/delete-faq.json",

            // Posts
            "store_post" => "/app/api-responses/posts/store-post.json",
            "store_thread_photo" => "/app/api-responses/posts/post-thread-file.json",
            "like_post" => "/app/api-responses/posts/like-post.json",
            "dislike_post" => "/app/api-responses/posts/dislike-post.json",
            "get_all_post" => "/app/api-responses/posts/get-all-post.json",
            "get_post_by_id" => "/app/api-responses/posts/get-post-by-id.json",
            "update_post" => "/app/api-responses/posts/update-post.json",
            "update_post_but_not_owner" => "/app/api-responses/posts/update-post-but-not-owner.json",
            "delete_thread_photo" => "/app/api-responses/posts/delete-post-file.json",
            "delete_post" => "/app/api-responses/posts/delete-post.json",
            "delete_post_but_not_owner" => "/app/api-responses/posts/delete-post-but-not-owner.json",

            // Comments
            "store_comment" => "/app/api-responses/comments/store-comment.json",
            "store_comment_photo" => "/app/api-responses/comments/store-comment-file.json",
            "like_comment" => "/app/api-responses/comments/like-comment.json",
            "dislike_comment" => "/app/api-responses/comments/dislike-comment.json",
            "get_all_comment_from_post" => "/app/api-responses/comments/get-all-comment.json",
            "update_comment" => "/app/api-responses/comments/update-comment.json",
            "update_comment_but_not_owner" => "/app/api-responses/comments/update-comment-but-not-owner.json",
            "delete_comment_photo" => "/app/api-responses/comments/delete-comment-file.json",
            "delete_comment" => "/app/api-responses/comments/delete-comment.json",
            "delete_comment_but_not_owner" => "/app/api-responses/comments/delete-comment-but-not-owner.json",

            // Replies
            "store_reply" => "/app/api-responses/replies/store-reply.json",
            "get_all_replies_from_comment" => "/app/api-responses/replies/get-all-reply.json",
            "update_reply" => "/app/api-responses/replies/update-reply.json",
            "update_reply_but_not_owner" => "/app/api-responses/replies/update-reply-but-not-owner.json",
            "delete_reply" => "/app/api-responses/replies/delete-reply.json",
            "delete_reply_but_not_owner" => "/app/api-responses/replies/delete-reply-but-not-owner.json",
        ]);
    }

    public function index()
    {
        return view('welcome')->with('documentation', $this->documentation);
    }
}
