<?php

namespace App\Http\Requests\Program;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Storage;

class PutProgramRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:120'],
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
            'name.required' => 'Nama perlu untuk diisi.',
            'name.string' => 'Nama harus berupa karakter.',
            'name.max' => 'Ukuran maksimal nama 100 karakter.',
            'description.required' => 'Deskripsi perlu untuk diisi.',
            'description.string' => 'Deskripsi harus berupa karakter.',
            'description.max' => 'Ukuran maksimal deskripsi 120 karakter.',
            'image.image' => 'Gambar program harus berupa image.',
            'image.mimetypes' => 'Gambar program harus memiliki tipe .jpg, .jpeg, .png, .svg.',
            'image.max' => 'Ukuran maksimal gambar program adalah 2 MB.',
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
     * Update previous image program to the new image
     * 
     * @param string $previousPath
     * @return string
     */
    public function updateProgramImage(string $previousPath): string
    {
        if (is_null($this->image)) {
            return $previousPath;
        }

        $image_name = last(explode('/', $previousPath));

        Storage::drive('public')->delete('programs/' . $image_name);

        $uploaded_new_image_file_path = Storage::drive('public')->putFile(
            path: 'programs',
            file: $this->image
        );

        return $uploaded_new_image_file_path;
    }
}
