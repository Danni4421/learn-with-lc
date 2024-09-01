<div class="my-5 scroll-m-16" id="post-faq">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new question</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/faqs</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                question: string; # required
                                answer: string; # required
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->post_faq }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-all-faq">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get all faq</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/faqs</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_all_faq }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-faq-by-id">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get faq by id</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/faqs/{id}</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_faq_by_id }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="update-faq">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Update faq</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/faqs/{id}</span></li>
        <li>Method: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">PUT</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                question: string; # required
                                answer: string; # required
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_faq }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-faq">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete faq</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/faqs/{id}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_faq }} 
            </code>
        </pre>
    </ul>
</div>
