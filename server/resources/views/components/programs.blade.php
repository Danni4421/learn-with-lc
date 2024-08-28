<div class="my-5 scroll-m-16" id="post-program">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new program</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/programs</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                name: string,
                                description: string,
                                image: File,
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->post_program }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-all-program">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get all program</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/programs</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_all_program }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-program-by-id">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get program by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/programs/{id}</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_program_by_id }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="update-program">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Update program by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/programs/{id}</span></li>
        <li>Method: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">PUT</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                name: string, # required
                                description: string, # required
                                image: File, # nullable
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_program_by_id }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-program">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete program by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/programs/{id}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_program_by_id }} 
            </code>
        </pre>
    </ul>
</div>