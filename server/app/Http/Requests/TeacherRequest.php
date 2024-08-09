<?php

namespace App\Http\Requests;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TeacherRequest extends FormRequest
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
            'gender' => ['required', 'in:lk,pr'],
            'role' => ['required', 'string'],
            'last_graduate_at' => ['required', 'string'],
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
            'name.max' => 'Nama memiliki maksimal 100 karakter.',
            'gender.required' => 'Jenis kelamin guru perlu untuk diisi.',
            'gender.in' => 'Jenis kelamin guru antara laki-laki atau perempuan',
            'role.required'  => 'Bidang mengajar guru perlu untuk diisi.',
            'role.string' => 'Bidang mengajar guru harus berupa karakter.',
            'last_graduate_at.required' => 'Lulusan universitas perlu untuk diisi.',
            'last_graduate_at.string' => 'Lulusan universitas harus berupa karakter.',
            'image.image' => 'Foto guru harus berupa gambar.',
            'image.mimetypes' => 'Ekstensi foto harus berupa .jpg, .jpeg, .png, .svg.',
            'image.max' => 'Maksimal ukuran foto adalah 2 MB.',
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
                    path: 'teachers',
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
            'name' => $this->name,
            'gender' => $this->gender,
            'role' => $this->role,
            'last_graduate_at' => $this->last_graduate_at,
            'image' => $this->uploaded_image_file_path
        ];
    }

    /**
     * Update teacher image 
     * 
     * @param string $previousPath
     * @return string
     */
    public function updateTeacherImage(string $previousPath): string
    {
        if (is_null($this->image)) {
            return $previousPath;
        }

        $image_name = last(explode('/', $this->image));

        Storage::drive('public')->delete('teachers/' . $image_name);

        $uploaded_new_image_file_path = Storage::drive('public')
            ->putFile(
                path: 'teachers',
                file: $this->image
            );

        return $uploaded_new_image_file_path;
    }
}
