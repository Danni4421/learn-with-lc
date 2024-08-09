<?php

namespace Database\Seeders;

use App\Models\LBB;
use App\Models\Level;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $level = Level::create([
            'id' => Str::random(16),
            'name' => 'Administrastor',
            'role' => 'administrator'
        ]);

        User::factory()->create([
            'level_id' => $level->id,
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        LBB::updateOrCreate([
            'about' => 'About Test',
            'description'=> 'Description Test',
            'image' => asset('assets/images/sandal_japit.jpg'),
            'activities' => json_encode([
                Str::random(16) => [
                    'id' => Str::uuid(),
                    'url' => asset('assets/images/sandal_japit.jpg')
                ],
            ]),
        ]);
    }
}
