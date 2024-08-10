<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\TeacherRequest;
use App\Models\Teacher;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    /**
     * Store a new teacher
     * 
     * @param TeacherRequest $request
     * @return JsonResponse
     */
    public function store(TeacherRequest $request): JsonResponse
    {
        $teacher = Teacher::create([
            'id' => Str::uuid(),
            ...$request->getData()
        ]);

        if (!$teacher) {
            throw new ServerError('Terjadi kesalahan pada server.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan guru.',
            'data' => [
                'teacher' => $teacher
            ]
        ], 201);
    }

    /**
     * Retrieve all teacher
     * 
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $teachers = Teacher::get()->map(function(Teacher $teacher) {
            $teacher->image = asset($teacher->image);
            return $teacher;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan guru.',
            'data' => [
                'teachers' => $teachers
            ]
        ]);
    }

    /**
     * Get teacher by id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            throw new NotFoundError('Gagal mendapatkan guru, Guru tidak ditmeukan.');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan guru.',
            'data' => [
                'teacher' => [
                    ...$teacher->toArray(),
                    'image' => asset($teacher->image)
                ]
            ]
        ]);
    }

    /**
     * Update teacher by requested id
     * 
     * @param TeacherRequest $request
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function update(TeacherRequest $request, string $id): JsonResponse
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            throw new NotFoundError('Gagal memperbarui guru, Guru tidak ditemukan.');
        }

        $updated_image_file_path = $request->updateTeacherImage($teacher->image);

        $teacher->update([
            'name' => $request->name,
            'gender' => $request->gender,
            'role' => $request->role,
            'last_graduate_at' => $request->last_graduate_at,
            'image' => $updated_image_file_path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui guru.'
        ]);
    }

    /**
     * Delete teacher based on id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            throw new NotFoundError('Gagal menghapus guru, Guru tidak ditemukan.');
        }

        $teacher->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus guru.'
        ]);
    }
}
