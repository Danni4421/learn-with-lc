<?php

namespace App\Http\Requests\Program;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PostProgramRequest extends FormRequest
{
    protected $uploaded_image_file_path;

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
            'image' => ['required', 'image', 'mimetypes:image/*', 'max:2048']
        ];
    }

    /**
     * Get the validation messages that apply to the request
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
            'image.required' => 'Gambar program perlu untuk disertakan.',
            'image.image' => 'Gambar program harus berupa image.',
            'image.mimetypes' => 'Gambar program harus memiliki tipe .jpg, .jpeg, .png, .svg.',
            'image.max' => 'Ukuran maksimal gambar program adalah 2 MB.'
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
     * Process after passed validation request
     * 
     * @return void
     */
    public function passedValidation(): void
    {
        if (!is_null($this->image) && $this->image instanceof UploadedFile) {
            $this->uploaded_image_file_path = Storage::drive('public')
                ->putFile(
                    path: 'programs', 
                    file: $this->image
                );
        }
    }

    /**
     * Get after processing data
     * 
     * @return array
     */
    public function getData(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'image' => 'storage/' . $this->uploaded_image_file_path
        ];
    }
}
