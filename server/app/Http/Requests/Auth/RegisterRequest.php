<?php

namespace App\Http\Requests\Auth;

use App\Models\Level;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Str;

class RegisterRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:50'],
            'firstname' => ['required', 'string', 'max:100'],
            'lastname' => ['nullable', 'string', 'max:100'],
            'email' =>  ['required', 'email:dns', 'unique:'.User::class],
            'password' => ['required', 'confirmed', 'min:8'],
            'level_id' => ['nullable', 'exists:'.Level::class.',id']
        ];
    }

    /**
     * Get custom messages to have better user experience
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'username.required' => 'Username perlu untuk diisi.',
            'username.string' => 'Username harus berupa sebuah karakter.',
            'username.max' => 'Username memiliki maksimal 50 karakter.',
            'firstname.required' => 'Nama depan perlu untuk diisi.',
            'firstname.string' => 'Nama depan harus berupa sebuah karakter.',
            'firstname.max' => 'Nama depan memiliki maksimal 100 karakter.',
            'lastname.string' => 'Nama belakang harus berupa sebuah karakter.',
            'lastname.max' => 'Nama belakang memiliki maksimal 100 karakter.',
            'email.required' => 'Email perlu untuk diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email telah digunakan.',
            'password.required' => 'Password perlu untuk diisi.',
            'confirmed' => 'Konfirmasi password tidak cocok.',
            'password.min' => 'Password memiliki minimal 8 karakter.',
            'level_id.exists' => 'Level tidak ditemukan.'
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
        throw new HttpResponseException(response()->json([
            'status' => 'fail',
            'message' => 'Bad request',
            'errors' => $validator->errors()->toJson()
        ], 400));
    }

    /**
     * Registering a new user
     * 
     * @return \App\Models\User
     */
    public function register(): User
    {
        $level = $this->level_id 
            ? $this->level_id 
            : Level::where(['role' => 'public'])
                ->first()
                ->id;

        $user = User::create([
            'level_id' => $level,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'username' => $this->username,
            'email' => $this->email,
            'password' => bcrypt($this->password),
            'remember_token' => Str::random(10)
        ]);

        return $user;
    }
}
