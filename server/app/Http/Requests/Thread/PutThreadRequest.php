<?php

namespace App\Http\Requests\Thread;

use App\Exceptions\AuthorizationError;
use App\Exceptions\InvariantError;
use App\Exceptions\NotFoundError;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PutThreadRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:150'],
            'content' => ['required', 'string'],
            'status' => ['required', 'in:open,closed'],
            'slugs' => ['nullable', 'array'],
            'slugs.*' => ['string', 'exists:'.PostCategory::class.',id'],
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
            'title.required' => 'Judul post perlu untuk diisi.',
            'title.string' => 'Judul post harus berupa karakter.',
            'title.max' => 'Judul memiliki maksimal 150 karakter.',
            'content.required' => 'Isi post perlu untuk diisi.',
            'content.string' => 'Isi post harus berupa karakter.',
            'status.required' => 'Status perlu untuk diisi.',
            'status.in' => 'Status hanya boleh antara open atau closed.',
            'slugs.array' => 'Slug harus berupa array.',
            'slugs.*.string' => 'Slug harus berupa karakter.',
            'slugs.*.exists' => 'Slug tidak ditemukan.',
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
     * Function that will return ready to produce data
     * 
     * @return array<string, string>
     */
    public function getData()
    {
        return [
            'title' => $this->input('title'),
            'content' => $this->input('content'),
            'status' => $this->input('status')
        ];
    }

    public function updatePost(string $postId): void
    {
        $post = Post::find($postId);

        if (!$post) {
            throw new NotFoundError('Gagal mengubah post, Post tidak ditemukan.');
        }

        if ($post->user_id != auth('api')->user()->id) {
            throw new AuthorizationError('Anda tidak diperbolehkan mengubah post.');
        }

        $post->slugs()->sync($this->input('slugs') ?? []);

        $post->update($this->getData());
    }
}
