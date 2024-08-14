<?php

namespace Database\Seeders;

use App\Models\LBB;
use App\Models\Level;
use App\Models\Program;
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
            'image' => '/assets/images/hero.png'
        ]);

        LBB::updateOrCreate([
            'about' => 'Bimbingan dan Dukungan untuk Mewujudkan <span class="text-primary">Impian</span> Akademis dan Karier.',
            'description'=> 'Mendukung Setiap Impian dengan Pembelajaran yang Berkualitas.',
            'image' => 'assets/images/hero.png',
            'activities' => json_encode([
                Str::random(16) => [
                    'id' => Str::uuid(),
                    'url' => 'assets/images/hero.png'
                ],
                Str::random(16) => [
                    'id' => Str::uuid(),
                    'url' => 'assets/images/hero.png'
                ],
            ]),
        ]);

        Program::updateOrCreate([
            'id' => Str::uuid(),
            'name' => 'Program SD',
            'description' => 'Program ini ditujukan untuk anak Sekolah Dasar.',
            'image' => 'assets/images/programs/1.svg'
        ]);

        Program::updateOrCreate([
            'id' => Str::uuid(),
            'name' => 'Program SMP',
            'description' => 'Program ini ditujukan untuk anak Sekolah SMP.',
            'image' => 'assets/images/programs/2.svg'
        ]);

        Program::updateOrCreate([
            'id' => Str::uuid(),
            'name' => 'Program SMA',
            'description' => 'Program ini ditujukan untuk anak Sekolah SMA.',
            'image' => 'assets/images/programs/1.svg'
        ]);

        Program::updateOrCreate([
            'id' => Str::uuid(),
            'name' => 'Program UTBK',
            'description' => 'Program ini ditujukan untuk persiapan UTBK.',
            'image' => 'assets/images/programs/2.svg'
        ]);
    }
}
