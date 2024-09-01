<?php

namespace App\Http\Requests\Thread;

use App\Exceptions\InvariantError;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostFile;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostThreadRequest extends FormRequest
{
    protected array $uploaded_files_path = [];

    protected string $default_post_status = 'open';
    
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
            'title' => ['required', 'string', 'max:150'],
            'content' => ['required', 'string'],
            'slugs' => ['nullable', 'array'],
            'slugs.*' => ['string', 'exists:'.PostCategory::class.',id'],
            'files' => ['nullable', 'array'],
            'files.*' => ['image', 'mimetypes:image/*', 'max:1024']
        ];
    }

    /**
     * Get the validation message that apply for each rule.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul perlu untuk diisi.',
            'title.string' => 'Judul harus berupa sebuah karakter.',
            'title.max' => 'Judul memiliki maksimal 150 karakter.',
            'slugs.array' => 'Slug harus berupa array.',
            'slugs.*.string' => 'Slug harus berupa karakter.',
            'slugs.*.exists' => 'Slug tidak ditemukan.',
            'content.required' => 'Isi post perlu untuk diisi.',
            'content.string' => 'Isi post harus berupa karakter.',
            'files' => 'File post harus berupa array.',
            'files.*.image' => 'File post harus berupa gambar.',
            'files.*.mimetypes' => 'Ekstensi file post antara .jpg, .jpeg, .png, .svg.',
            'files.*.max' => 'Maksimal ukuran setiap file post adalah 1 MB.',
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
     * Summary of store_post
     * @return Post
     */
    public function storePost()
    {
        if ($this->has('files')) {
            foreach ($this->files as $file) {
                $file = UploadedFile::createFromBase($file[0]);

                $this->uploaded_files_path[] = Storage::drive('public')->putFile(
                    'post_files',
                    $file
                );
            }
        }

        $user = auth('api')->user();

        $post = Post::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'title' => $this->input('title'),
            'content' => $this->input('content'),
            'status' => $this->default_post_status,
        ]);

        if ($this->has('slugs')) {
            $post->slugs()->sync($this->input('slugs'));
        }

        if (count($this->uploaded_files_path)) {
            foreach ($this->uploaded_files_path as $file_path) {
                PostFile::create([
                    'id' => Str::uuid(),
                    'post_id' => $post->id,
                    'path' => $file_path
                ]);
            }
        }

        return $post;
    }
}
