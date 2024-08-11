<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Login User
     * 
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        return $request->authenticate();
    }

    /**
     * Get Logged User
     * 
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan informasi diri.',
            'data' => [
                'user' => Auth::guard('api')->user(),
            ]
        ]);
    }

    /**
     * Refresh JWT Token
     * 
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        $refreshedToken = JWTAuth::refresh();

        if (!$refreshedToken) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Gagal memperbarui token.'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mempebarui token.',
            'data' => [
                'token' => $refreshedToken
            ]
        ]);
    }

    /**
     * Logout User
     * 
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil logged out',
        ]);
    }
}