<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\FAQRequest;
use App\Models\FAQ;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class FAQController extends Controller
{
    /**
     * Store a new question
     * 
     * @param FAQRequest $request
     * @throws ServerError
     * @return JsonResponse
     */
    public function store(FAQRequest $request): JsonResponse
    {
        $FAQ = FAQ::create([
            'id' => Str::uuid(),
            ...$request->getData()
        ]);

        if (!$FAQ) {
            throw new ServerError('Maaf terjadi permasalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan FAQ.',
            'data' => [
                'faq' => $FAQ
            ]
        ], 201);
    }

    /**
     * Retrieve all question
     * 
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $FAQs = FAQ::all();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan pertanyaan',
            'data' => [
                'faqs' => $FAQs
            ]
        ]);
    }
    
    /**
     * Retrieve question based on id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $FAQ = FAQ::find($id);

        if (!$FAQ) {
            throw new NotFoundError('Gagal menampilkan pertanyaan, Pertanyaan tidak ditemukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menampilkan pertanyaan.',
            'data' => [
                'faq' => $FAQ
            ]
        ]);
    }

    /**
     * Update question based on id
     * 
     * @param FAQRequest $request
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function update(FAQRequest $request, string $id): JsonResponse
    {
        $FAQ = FAQ::find($id);

        if (!$FAQ) {
            throw new NotFoundError('Gagal memperbarui pertanyaan, Pertanyaan tidak ditemukan.');
        }

        $FAQ->update($request->getData());

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui pertanyaan.'
        ]);
    }

    /**
     * Delete question based on id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $FAQ = FAQ::find($id);

        if (!$FAQ) {
            throw new NotFoundError('Gagal menghapus pertanyaan, Pertanyaan tidak ditemukan.');
        }

        $FAQ->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus pertanyaan.',
        ]);
    }
}
