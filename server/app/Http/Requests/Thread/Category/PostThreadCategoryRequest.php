<?php

namespace App\Http\Requests\Thread\Category;

use App\Exceptions\InvariantError;
use App\Models\PostCategory;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostThreadCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * 
     * @throws \App\Exceptions\AuthorizationError
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
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:'.PostCategory::class.',slug'],
            'description' => ['required', 'string']
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
            'name.required' => 'Nama perlu untuk diisi.',
            'name.string' => 'Nama harus berupa karakter.',
            'slug.required' => 'Slug perlu untuk diisi.',
            'slug.string' => 'Slug harus berupa karakter.',
            'slug.unique' => 'Slug sudah ada.',
            'description.required' => 'Deskripsi perlu untuk diisi.',
            'description.string' => 'Deskripsi harus berupa karakter.'
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

    public function storePostCategory(): PostCategory
    {
        return PostCategory::create([
            'id' => Str::uuid(),
            ...$this->all(),
        ]);
    }
}
