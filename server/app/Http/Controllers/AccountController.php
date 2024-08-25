<?php

namespace App\Http\Controllers;

use App\Models\User;

class AccountController extends Controller
{
    public function showByUsername(string $username)
    {
        $user = User::where(['username' => $username])->with(['level'])->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan user.',
            'data' => [
                'user' => [
                    ...$user->toArray(),
                    'image' => $this->asset($user->image),
                ]
            ]
        ]);
    }
}
