<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\LevelRequest;
use App\Models\Level;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class LevelController extends Controller
{
    /**
     * Store a new level
     * 
     * @param LevelRequest $request
     * @return JsonResponse
     */
    public function store(LevelRequest $request): JsonResponse
    {
        $level = Level::create([
            'id' => Str::random(16),
            'name' => $request->name,
            'role' => $request->role
        ]);

        if (!$level) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan level.',
            'data' => [
                'level' => $level
            ]
        ], 201);
    }

    /**
     * Retrieve all levels
     * 
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $levels = Level::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan level.',
            'data' => [
                'levels' => $levels
            ]
        ]);
    }

    /**
     * Retrieve level based on id
     * 
     * @param string $role
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $role): JsonResponse
    {
        $level = Level::find(['role' => $role]);

        if (!$level) {
            throw new NotFoundError('Gagal mendapatkan level, Level tidak ditemukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan level.',
            'data' => [
                'level' => $level
            ]
        ]);
    }

    /**
     * Delete level based on id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return mixed|JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $level = Level::find($id);

        if (!$level) {
            throw new NotFoundError("Gagal menghapus level, Level tidak ditemukan.");
        }

        $level->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus level.',
            'data' => [
                'id' => $level->id
            ]
        ]);
    }
}
