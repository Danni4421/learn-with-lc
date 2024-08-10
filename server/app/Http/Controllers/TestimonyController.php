<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\TestimonyRequest;
use App\Models\Testimony;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class TestimonyController extends Controller
{
    public function store(TestimonyRequest $request): JsonResponse
    {
        $testimony = Testimony::create([
            'id' => Str::uuid(),
            ...$request->getData()
        ]);

        if (!$testimony) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan guru',
            'data' => [
                'testimony' => $testimony
            ]
        ], 201);
    }

    public function all(): JsonResponse
    {
        $testimonials = Testimony::get()->map(function(Testimony $testimony) {
            $testimony->image = asset($testimony->image);
            return $testimony;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan testimoni.',
            'data' => [
                'testimonials' => $testimonials
            ]
        ]);
    }

    public function show(string $id)
    {
        $testimony = Testimony::find($id);

        if (!$testimony) {
            throw new NotFoundError('Gagal mendapatkan testimoni, Testimoni tidak ditemukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan testimoni.',
            'data' => [
                'testimony' => [
                    ...$testimony->toArray(),
                    'image' => asset($testimony->image)
                ]
            ]
        ]);
    }

    public function update(TestimonyRequest $request, string $id): JsonResponse
    {
        $testimony = Testimony::find($id);

        if (!$testimony) {
            throw new NotFoundError('Gagal memperbarui testimoni, Testimoni tidak ditemukan.');
        }

        $updated_image_file_path = $request->updateTestimonyImage($testimony->image);

        $testimony->update([
            'testimony' => $request->testimony,
            'testimoner_name' => $request->testimoner_name,
            'last_graduate_at' => $request->last_graduate_at,
            'now_studied_at' => $request->now_studied_at,
            'image' => $updated_image_file_path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui testimoni.'
        ]);
    }

    public function destroy(string $id) {
        $testimony = Testimony::find($id);

        if (!$testimony) {
            throw new NotFoundError('Gagal menghapus testimoni. Testimoni tidak ditemukan.');
        }

        $testimony->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus testimoni.'
        ]);
    }
}
