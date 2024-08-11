<?php

namespace Database\Seeders;

use App\Models\FAQ;
use App\Models\LBB;
use App\Models\Level;
use App\Models\Program;
use App\Models\Testimony;
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

        Testimony::updateOrCreate([
            'id' => Str::uuid(),
            'testimony' => 'Les di LC itu enjoy banget. Aku pernah les ditempat lain tapi gak cocok. Alhamdulillah di sini langsung cocok. Gurunya kalua jelasin itu sabar banget soalnya aku sering debat tentang soal - soal tapi selalu dijelasin sampai aku paham betul. ngajarnya itu asyik soalnya Waktu jelasin selalu diberi perumpamaan jadi buat aku gampang memahami. Aku juga awalnya itu gak suka baca, mesti stress dan pas di LC tentornya itu bisa buat aku jadi mau baca dan gak stress lihat soal literasi. Akhirnya nilai literasiku naik banget dan aku keterima jalur UTBK Pendidikan Dokter UNEJ. Seneng banget.',
            'testimoner_name' => 'Harist M Abidzar',
            'now_studied_at' => 'Pendidikan Dokter UNEJ',
            'last_graduate_at' => 'SMAN 4 Surabaya',
            'image' => null
        ]);

        Testimony::updateOrCreate([
            'id' => Str::uuid(),
            'testimony' => 'Aku pernah trauma belaja karena disuruh maju dan salah menjawab dan aku malu banget. semenjak itu aku jadi anak yang takutan, minder dan gak percaya diri. Syukurnya aku nemukan LC dari temanku dan gilaaaa.... di sini tuh gurunya sabar-sabar banget. Gak pernah marah dan gak pernah menyalahkan atau menyudutkan Ketika aku menjawab salah. Ini suasana belajar yang kuinginkan dari dulu. Aku jadi berani mencoba dan mengahapi semua yang saya takutkan. Akhirnya aku gak mau pisah dari LC sejak SMP sampai SMA dan Alhamdulillah aku keterima jalur UTBK UPN "Veteran" Jatim Administrasi Publik dan Poltekes Surabaya D-IV Teknologi Laboratorium Medis',
            'testimoner_name' => 'Nasya Mulya P',
            'now_studied_at' => 'Administrasi Publik UPNV Jatim dan D-IV Teknologi Laboratorium Medis Poltekes Surabaya',
            'last_graduate_at' => 'SMAN 2 Surabaya',
            'image' => null
        ]);

        Testimony::updateOrCreate([
            'id' => Str::uuid(),
            'testimony' => 'Belajar di LC rasanya fun dan ngga pernah bosenin! Penjelasan materi mudah dipahami dan ngga ditekankan untuk menghafal materi atau rumus tapi diajarkan tentang konsep materi dan penerapannya di kehidupan sehari-hari. Gurunya sabar, perhatian, nyaman banget konsultasi tugas sekolah sangat memahami siswa. Alhamdulillah saya keterima jalur SNBP (Seleksi Nasional Berdasarkan Prestasi) S1 UPN "Veteran" Jatim Administrasi Publik',
            'testimoner_name' => 'Amelia Nisrina',
            'now_studied_at' => 'Administrasi Publik UPNV Jatim Jalur SNBP',
            'last_graduate_at' => 'SMAN 1 Surabaya',
            'image' => null
        ]);

        Testimony::updateOrCreate([
            'id' => Str::uuid(),
            'testimony' => 'Saya mulai di LC itu dari kelas 4 SB sampai lulus SMA dan masih gak mau pisah hehe.  Sebelum di LC aku pernah les di beberapa tempat tapi biasa saja dan nilaiku juga stagnan terus. Setelah diajak teman les di LC untuk OLIMPIADE MATEMATIKA langsung nyaman banget. di LC bisa membuat saya menyukai pelajaran yang aku awalnya gak suka. Metode mengajar tentornya yang SERU SEKALI selalu bisa mengaitkan materi dengan aplikasinya dalam kehidupan. Tidak hanya itu, tentornya pada sabar banget. Les di LC SANGAT MENYENANGKAN dan TIDAK ADA KATA BOSAN. Bagi kalian yan ingin belajar lesnya seru ada praktikumnya, ada nontonya, les lah di LC. Astungkara aku masuk top Fifteen aligible dan juga keterima AKAMIGAS Jalur Prestasi Raport',
            'testimoner_name' => 'Putu Winda F. C. D',
            'now_studied_at' => 'AKAMIGAS Jalur Prestasi Raport',
            'last_graduate_at' => 'SMAN 16 Surabaya',
            'image' => null
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

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Apa itu Lentera Cendekia?',
            'answer' => '<b>Lentera Cendekia</b> adalah lembaga bimbingan belajar yang menyediakan lingkungan belajar yang mendukung dan menyenangkan melalui metode <b>"Fun and Meaningful Learning,"</b> sehingga siswa tidak hanya menghafal, tetapi juga memahami konsep yang diajarkan.'
        ]);

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Apa saja program yang ditawarkan oleh Lentera Cendekia?',
            'answer' => 'Kami menawarkan berbagai program bimbingan belajar, termasuk pelajaran reguler, persiapan ujian, dan kelas tambahan seperti praktikum dan outing class untuk pengalaman belajar yang lebih beragam dan tidak membosankan.'
        ]);

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Bagaimana cara mendaftar di Lentera Cendekia?',
            'answer' => 'Anda dapat menghubungi kami secara langsung baik itu secara online melalui platfrom <b>Whatsapp</b> maupun offline pada kantor kami pada ....'
        ]);

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Apakah Lentera Cendekia menawarkan kelas online?',
            'answer' => 'Ya, kami juga menawarkan kelas online untuk siswa yang tidak bisa hadir secara langsung. Kelas online kami dirancang untuk tetap interaktif dan menarik, sehingga siswa tetap dapat merasakan manfaat dari metode "Fun and Meaningful Learning."'
        ]);

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Apakah ada sesi konsultasi untuk orang tua?',
            'answer' => 'Ya, kami menyediakan sesi konsultasi rutin untuk orang tua. Kami percaya bahwa kerjasama antara lembaga bimbingan belajar dan orang tua sangat penting untuk kesuksesan siswa.'
        ]);

        FAQ::updateOrCreate([
            'id' => Str::uuid(),
            'question' => 'Bagaimana saya bisa mendapatkan informasi lebih lanjut tentang Lentera Cendekia?',
            'answer' => 'Untuk informasi lebih lanjut, Anda dapat mengunjungi website kami atau menghubungi kami melalui nomor telepon yang tersedia. Anda juga bisa mengikuti akun media sosial kami untuk update dan informasi terbaru.'
        ]);
    }
}
