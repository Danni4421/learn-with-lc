<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundError;
use App\Exceptions\ServerError;
use App\Http\Requests\Program\PostProgramRequest;
use App\Http\Requests\Program\PutProgramRequest;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    /**
     * Generate new Program
     * 
     * @param PostProgramRequest $request
     * @return JsonResponse
     */
    public function store(PostProgramRequest $request): JsonResponse
    {
       $program = Program::create([
            'id' => Str::uuid(),
            ...$request->getData()
       ]);

       if (!$program) {
            throw new ServerError('Terjadi kesalahan pada server.');
       }

       return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan program.',
            'data' => [
                'program' => $program
            ]
       ], 201);
    }

    /**
     * Retrieve all program data
     * 
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $programs = Program::orderByDesc('created_at')->get()->map(function(Program $program) {
            $program->image = asset($program->image);
            return $program;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan program terbaru',
            'data' => [
                'programs' => $programs
            ],
        ]);
    }

    /**
     * Retrieve program based on id
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $program = Program::find($id)->map(function (Program $program) {
            $program->image = asset($program->image);
            return $program;
        });

        if (!$program) {
            throw new NotFoundError('Program tidak ditemukan.');
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan program.',
            'data' => [
                'program' => [
                    'id' => $program->id,
                    'name' => $program->name,
                    'description' => $program->description,
                    'order_number' => $program->order_number,
                    'image' => asset('storage/' . $program->image)
                ],
            ],
        ]);
    }

    /**
     * Update program 
     * 
     * @param Request $request
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function update(PutProgramRequest $request, string $id): JsonResponse
    {
        $program = Program::find($id);

        if (!$program) {
            throw new NotFoundError("Program tidak ditemukan.");
        }

        $updated_image_file_path = $request->updateProgramImage($program->image);

        $program->update([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $updated_image_file_path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui program.'
        ]);
    }

    /**
     * Delete existing program
     * 
     * @param string $id
     * @throws NotFoundError
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $program = Program::find($id);

        if (!$program) {
            throw new NotFoundError('Program tidak ditemukan.');
        }

        $program->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus program.'
        ]);
    }
}
