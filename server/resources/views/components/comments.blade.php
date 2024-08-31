<div class="my-5 scroll-m-16" id="post-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new comment to thread</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                comment: string; # required
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
                {{ $documentation->store_comment }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="post-comment-photo">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Post a new photo to a comment</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}/files</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                file: File # required
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->store_comment_photo }} 
            </code>
        </pre>
    </ul>
</div>


<div class="my-5 scroll-m-16" id="like-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Like a comment</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}/like</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->like_comment }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="dislike-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Dislike a comment</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}/dislike</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->dislike_comment }} 
            </code>
        </pre>
    </ul>
</div>


<div class="my-5 scroll-m-16" id="get-all-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get all comment from a thread</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_all_comment_from_post }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="update-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Update post</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}</span></li>
        <li>Method: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">PUT</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    FormData:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                comment: string; # required
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
                {{ $documentation->update_comment }} 
            </code>
        </pre>
        <li>Response when user is not comment owner: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->update_comment_but_not_owner }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="delete-comment-photo">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete comment photo</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}/files/{fileId}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_comment_photo }} 
            </code>
        </pre>
    </ul>
</div>


<div class="my-5 scroll-m-16" id="delete-comment">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Delete comment</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/posts/{postId}/comments/{commentId}</span></li>
        <li>Method: <span class="text-red-500 ms-2 px-2 py-1 bg-gray-100 rounded">DELETE</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_comment }} 
            </code>
        </pre>
        <li>Response when user is not comment owner: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->delete_comment_but_not_owner }} 
            </code>
        </pre>
    </ul>
</div>
