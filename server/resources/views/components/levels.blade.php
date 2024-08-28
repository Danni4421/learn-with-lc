<div class="my-5 scroll-m-16" id="post-level">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new level</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/levels</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->post_level }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="available-levels">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get Available Level's</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/levels</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg">
            <code class="language-json">
                {{ $documentation->available_levels }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-level">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete level by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/levels/{id}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_level }} 
            </code>
        </pre>
    </ul>
</div>