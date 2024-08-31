<?php

namespace App\Http\Requests;

use App\Exceptions\InvariantError;
use App\Models\CommentFile;
use App\Models\PostFile;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorePostCommentFileRequest extends FormRequest
{
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
            'file' => ['image', 'mimetypes:image/*', 'max:1024']
        ];
    }

     /**
     * Get the validation message that apply for each rule
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.image' => 'File harus berupa gambar.',
            'file.mimetypes' => 'Ekstensi file antara .jpg, .jpeg, .png, .svg.',
            'file.max' => 'Maksimal ukuran setiap file adalah 1 MB.',
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

    public function storeIntoPost(string $postId): PostFile
    {
        $post_file_path = $this->storeIntoStorage('post_files');

        return PostFile::create([
            'id' => Str::uuid(),
            'post_id' => $postId,
            'path' => $post_file_path
        ]);
    }

    public function storeIntoComment(string $commentId): CommentFile
    {
        $post_file_path = $this->storeIntoStorage('comment_files');

        return CommentFile::create([
            'id' => Str::uuid(),
            'comment_id' => $commentId,
            'path' => $post_file_path
        ]);
    }

    /**
     * Put file into storage
     * 
     * @param string $destination
     * @return string
     */
    public function storeIntoStorage(string $destination): string
    {
        return Storage::drive('public')->putFile($destination, $this->file);
    }
}
