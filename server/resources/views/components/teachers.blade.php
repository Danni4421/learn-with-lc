<div class="my-5 scroll-m-16" id="post-activity">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new teacher</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/teachers</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                name: string;
                                gender: string; # it can be "lk" or "pr"
                                role: string;
                                last_graduate_at: string;
                                image: File;
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->post_teacher }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-all-teacher">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get all teacher</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/teachers</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_all_teacher }} 
            </code>
        </pre>
    </ul>
</div>


<div class="my-5 scroll-m-16" id="get-teacher-by-id">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get teacher by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/teachers/{id}</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_teacher_by_id }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="update-teacher">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Update teacher</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/teachers/{id}</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">PUT</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                name: string; # required
                                gender: string; # required, it can be "lk" or "pr"
                                role: string; # required
                                last_graduate_at: string; # required
                                image: File; # nullable
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_teacher }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-teacher">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete teacher</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/teachers/{id}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_teacher }} 
            </code>
        </pre>
    </ul>
</div>

