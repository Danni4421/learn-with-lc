<?php

namespace App\Http\Requests;

use App\Exceptions\InvariantError;
use App\Models\CommentFile;
use App\Models\PostComment;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostCommentRequest extends FormRequest
{
    protected $uploaded_files_path = [];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'comment' => ['required', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['image', 'max:1024']
        ];
    }

    /**
     * Get the validation message for each rule.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'comment.required' => 'Komentar perlu untuk diisi.',
            'comment.string' => 'Komentar harus berupa karakter.',
            'files.*.images' => 'File pada komentar harus berupa gambar.',
            'files.*.max' => 'File pada komentar memiliki maksimal 1 MB.'
        ];
    }

    /**
     * Handling validation error
     * 
     * @param Validator $validator
     * @throws HttpResponseException
     * @return never
     */
    public function failedValidation(Validator $validator)
    {
        throw new InvariantError(errors: $validator->errors()->toArray());
    }

    /**
     * Return ready to produce data
     * 
     * @return array<string, mixed>
     */
    public function getData(): array
    {
        return [
            'comment' => $this->input('comment'),
        ];
    }

    public function store_comment(string $postId): PostComment
    {
        if (count($this->files)) {
            foreach ($this->files as $file) {
                $file = UploadedFile::createFromBase($file[0]);

                $this->uploaded_files_path[] = Storage::drive('public')->putFile(
                    'comment_files',
                    $file
                );
            }
        }

        $user = auth('api')->user();

        $comment = PostComment::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'post_id' => $postId,
            'comment' => $this->input('comment'),
        ]);

        if (count($this->uploaded_files_path)) {
            foreach ($this->uploaded_files_path as $file_path) {
                CommentFile::create([
                    'id' => Str::uuid(),
                    'comment_id' => $comment->id,
                    'path' => $file_path
                ]);
            }
        }

        return $comment;
    }
}
