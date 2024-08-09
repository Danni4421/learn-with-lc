<?php

namespace App\Http\Controllers;

use App\Exceptions\InvariantError;
use App\Http\Requests\LBBRequest;
use App\Models\LBB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class LBBController extends Controller
{
    /**
     * Get LBB description
     * 
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $LBB = LBB::first();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mendapatkan hero LBB.',
            'data' => [
                'lbb' => [
                    'about' => $LBB->about,
                    'description' => $LBB->description,
                    'image' => asset($LBB->image),
                    'activities' => json_decode($LBB->activities)
                ]
            ],
        ]);
    }

    /**
     * Store a new activities
     * 
     * @param Request $request
     * @throws InvariantError
     * @return JsonResponse
     */
    public function store_activities(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'mimetypes:image/*', 'max:1024']
        ], [
            'images.required' => 'Minimal terdapat satu gambar.',
            'images.array' => 'Tipe request harus sebuah array.',
            'images.min' => 'Minimal harus terdapat 1 gambar.',
            'images.*.image' => 'Activity harus berupa gambar.', 
            'images.*.mimetypes' => 'Gambar activity harus berupa .jpg, .jpeg, .png, .svg.',
            'images.*.max' => 'Maksimal ukuran gambar adalah 1 MB.'
        ]);

        if ($validator->fails()) {
            throw new InvariantError(errors: $validator->errors()->toArray());
        }

        $LBB = LBB::first();
        $activities = json_decode($LBB->activities, true);

        foreach ($request->images as $image) {
            $uploaded_image_file_path = Storage::drive('public')
                ->putFile('activities', $image);

            $activities[Str::random(16)] = [
                'id' => Str::uuid(),
                'url' => asset('storage/' . $uploaded_image_file_path)
            ];
        }

        $LBB->update([
            'activities' => json_encode($activities)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menambahkan aktifitas.',
        ], 201);
    }

    /**
     * Update description of company
     * @param LBBRequest $request
     * @return JsonResponse
     */
    public function update_hero(LBBRequest $request): JsonResponse
    {
        $LBB = LBB::first();

        $uploaded_new_image_path = $request->updateLBBImage($LBB->image);

        $LBB->update([
            'about' => $request->about,
            'description' => $request->description,
            'image' => $uploaded_new_image_path
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil memperbarui hero LBB.',
        ]);
    }

    /**
     * Delete selected activity
     * 
     * @param string $id
     * @return JsonResponse
     */
    public function destroy_activity(string $id): JsonResponse
    {
        $LBB = LBB::first();

        $activities = json_decode($LBB->activities, true);

        foreach ($activities as $key => $activity) {
            if ($key == $id) {
                $image_name = last(explode('/', $activity["url"]));
                Storage::drive('public')->delete('activities/' . $image_name);

                unset($activities[$key]);
            }
        }

        $LBB->update([
            'activities' => json_encode($activities)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil menghapus aktifitas.',
        ]);
    }

}
