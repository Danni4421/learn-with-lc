<?php

namespace App\Http\Requests;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Storage;

class LBBRequest extends FormRequest
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
            'about' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimetypes:image/*', 'max:2048']
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'about.required' => 'About perlu untuk diisi.',
            'about.string' => 'About herus berupa karakter.',
            'about.max' => 'Maksimal dari about adalah 255 karakter.',
            'description.required' => 'Deskripsi perlu untuk diisi.',
            'description.string' => 'Deskripsi harus berupa karakter.',
            'description.max' => 'Maksimal dari deskripsi adalah 255 karakter.',
            'image.image' => 'Gambar utama LBB harus berupa image.',
            'image.mimetypes' => 'Tipe gambar utama LBB berupa .jpg, .jpeg, .png, .svg.',
            'image.max' => 'Maksimal ukuran gambar utama LBB adalah 2 MB.',
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
     * Get updated lbb image path
     * 
     * @param string $previousPath
     * @return string
     */
    public function updateLBBImage(string $previousPath): string
    {
        if (is_null($this->image)) {
            return $previousPath;
        }

        $image_name = last(explode('/', $previousPath));

        Storage::drive('public')->delete($image_name);

        $uploaded_new_image_file_path = Storage::drive('public')->putFile(
            path: '/',
            file: $this->image
        );

        return $uploaded_new_image_file_path;
    }
}
