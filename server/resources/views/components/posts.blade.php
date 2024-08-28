<div class="my-5 scroll-m-16" id="post-thread">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new thread</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                title: string; # required
                                content: string; # required
                                files[]: FileList # nullable
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->store_post }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-all-thread">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get all post</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_all_post }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-thread-by-id">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get post by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{id}</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_post_by_id }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="update-thread">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Update post</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{id}</span></li>
        <li>Method: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">PUT</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                title: string; # required
                                content: string; # required
                                files[]: FileList # nullable
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_post }} 
            </code>
        </pre>
        <li>Response when user is not thread owner: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_post_but_not_owner }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-thread">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete post</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{id}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_post }} 
            </code>
        </pre>
        <li>Response when user is not thread owner: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_post_but_not_owner }} 
            </code>
        </pre>
    </ul>
</div>
