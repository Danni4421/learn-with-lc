<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

  @vite('resources/css/app.css')
  @vite('resources/js/app.js')
</head>
<body>
  <div class="flex">
    <x-sidebar />

    <main class="flex flex-col gap-8 ps-14 pt-12 p-8 w-full max-h-screen overflow-y-auto">
        {{-- App --}}
        <h1 class="text-3xl">LearnWithLC API</h1>

        {{-- Base URL --}}
        <div>
            <h2 class="text-2xl">Base URL</h2>
            <div class="min-w-full bg-gray-100 px-5 py-3 rounded mt-2 border-s-4 border-indigo-500">
                <span class="text-indigo-500 underline font-bold text-xl">{{ env('APP_URL', 'http://api.example.localhost') }}/api</span>
            </div>
        </div>

        {{-- LBB Section --}}
        <section id="lbb">
            <h2 class="text-2xl">LBB</h2>

            <div class="my-5 scroll-m-16" id="lbb-information">
                <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get LBB Information</h3>
                <ul class="mt-5 flex flex-col gap-2">
                    <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/lbb</span></li>
                    <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
                    <li>Response: </li>
                    <pre class="p-4 rounded-lg"> 
                        <code class="language-json">
                            {{ $documentation->lbb }} 
                        </code>
                    </pre>
                </ul>
            </div>
        </section>
        {{-- End LBB Section --}}

        {{-- Levels --}}
        <section id="levels">
            <h2 class="text-2xl">User Levels</h2>

            @include('components.levels')
        </section>
        {{-- End Levels --}}
        
        {{-- Users --}}
        <section id="users">
            <h2 class="text-2xl">Users Authentication</h2>

            @include('components.users')
        </section>
        {{-- End Users --}}
        
        {{-- Programs --}}
        <section id="programs">
            <h2 class="text-2xl">Programs</h2>

            @include('components.programs')
        </section>
        {{-- End Programs --}}
        
        {{-- Acvities --}}
        <section id="activities">
            <h2 class="text-2xl">Activities</h2>

            @include('components.activities')
        </section>
        {{-- End Activities --}}
        
        {{-- Teacher --}}
        <section id="activities">
            <h2 class="text-2xl">Teachers</h2>

            @include('components.teachers')
        </section>
        {{-- End Activities --}}
        
        {{-- Testimonial --}}
        <section id="testimonial">
            <h2 class="text-2xl">Testimonial</h2>

            @include('components.testimonials')
        </section>
        {{-- End Testimonial --}}
        
        {{-- FAQs --}}
        <section id="faqs">
            <h2 class="text-2xl">Frequently Asked Question</h2>

            @include('components.faqs')
        </section>
        {{-- End FAQs --}}

         {{-- Posts --}}
         <section id="posts">
            <h2 class="text-2xl">Thread</h2>

            @include('components.posts')
        </section>
        {{-- End Posts --}}

        {{-- Comment --}}
        <section id="comments">
            <h2 class="text-2xl">Comments</h2>

            @include('components.comments')
        </section>
        {{-- End Comment --}}

        {{-- Replies --}}
        <section id="replies">
            <h2 class="text-2xl">Replies</h2>

            @include('components.replies')
        </section>
        {{-- End Replies --}}
    </main>
  </div>
</body>
</html>