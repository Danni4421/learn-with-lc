<?php

namespace App\Http\Requests\Auth;

use App\Exceptions\InvariantError;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
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
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    /**
     * Custom messages to make better user experience
     * 
     * @return array
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email perlu untuk diisi.',
            'email.email' => 'Format email tidak valid.',
            'password.required' => 'Password perlu untuk diisi.',
            'password.string' => 'Password harus berupa karakter.',
            'password.min' => 'Password memiliki minimal 8 karakter.',
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
        throw new InvariantError($validator->errors()->toJson());
    }

    /**
     * Authenticate users 
     * 
     * @return JsonResponse
     */
    public function authenticate(): JsonResponse
    {
        if (! $token = Auth::guard('api')->attempt(
                $this->only(['email', 'password'])
            )) {
            return response()->json([
                'email' => [
                    'status' => 'fail',
                    'message' => 'Unauthorize'
                ]
            ], 401);
        }

        return $this->responseWithToken(token: $token);
    }

    /**
     * Utility to simplyfy Response With Token
     * 
     * @param string $token
     * @return JsonResponse
     */
    protected function responseWithToken(string $token): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil.',
            'data' => [
                'token' => $token,
                'token_type' => 'bearer',
                'expired_in' => JWTAuth::factory()->getTTL() * 60
            ]
        ]);
    }
}
