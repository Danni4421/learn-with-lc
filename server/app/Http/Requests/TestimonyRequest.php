<?php

namespace App\Http\Requests;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TestimonyRequest extends FormRequest
{
    /**
     * @var string | null
     */
    protected $uploaded_image_file_path = null;

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
            'testimony' => ['required', 'string'],
            'testimoner_name' => ['required', 'string', 'max:120'],
            'last_graduate_at' => ['required', 'string'],
            'now_studied_at' => ['required', 'string'],
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
            'testimony.required' => 'Testimoni perlu untuk diisi.',
            'testimony.string' => 'Testimoni harus berupa karakter.',
            'testimoner_name.required' => 'Nama testimoner perlu untuk diisi.',
            'testimoner_name.string' => 'Nama testimoner harus berupa karakter.',
            'testimoner_name.max' => 'Nama testimoner maksimal 120 karakter',
            'last_graduate_at.required' => 'Tempat pendidikan terakhir perlu untuk diisi.',
            'last_graduate_at.string' => 'Tempat pendidikan terakhir harus berupa karakter.',
            'now_studied_at.required' => 'Tempat pendidikan sekarang perlu untuk diisi.',
            'now_studied_at.string' => 'Tempat pendidikan sekarang harus berupa karakter.',
            'image.image' => 'Foto testimoner harus berupa gambar.',
            'image.mimetypes' => 'Foto testimoner harus berupa .jpg, .jpeg, .png, .svg.',
            'image.max' => 'Maksimal ukuran foto testimoner adalah 2 MB.'
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
    public function passedValidation()
    {
        if (!is_null($this->image) && $this->image instanceof UploadedFile) {
            $this->uploaded_image_file_path = Storage::drive('public')
                ->putFile(
                    path: 'testimonials',
                    file: $this->image
                );
        }
    }

    /**
     * Get ready to produced data
     * 
     * @return array<string, string>
     */
    public function getData(): array
    {
        return [
            'testimony' => $this->testimony,
            'testimoner_name' => $this->testimoner_name,
            'last_graduate_at' => $this->last_graduate_at,
            'now_studied_at' => $this->now_studied_at,
            'image' => !is_null($this->uploaded_image_file_path) 
                ? 'storage/' . $this->uploaded_image_file_path 
                : null
        ];
    }

    /**
     * Update teacher image 
     * 
     * @param string | null $previousPath
     * @return string | null
     */
    public function updateTestimonyImage($previousPath): string | null
    {
        if (is_null($this->image)) return $previousPath;

        $image_name = last(explode('/', $this->image));

        Storage::drive('public')->delete('testimonials/' . $image_name);

        $uploaded_new_image_file_path = Storage::drive('public')
            ->putFile(
                path: 'testimonials',
                file: $this->image
            );

        return 'storage/' . $uploaded_new_image_file_path;
    }
}
