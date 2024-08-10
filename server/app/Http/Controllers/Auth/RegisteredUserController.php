<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\ServerError;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * Register a new User
     * 
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $request->register();

        if (!$user) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi user berhasil.',
            'user' => $user,
        ], 201);
    }
}
