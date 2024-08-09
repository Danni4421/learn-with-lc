<?php

namespace App\Http\Controllers\Auth;

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
            return response()->json([
                'status' => 'fail',
                'message' => 'Registrasi user gagal.'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi user berhasil.',
            'user' => $user,
        ], 201);
    }
}
