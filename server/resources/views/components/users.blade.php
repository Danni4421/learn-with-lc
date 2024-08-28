<div class="my-5 scroll-m-16" id="register-user">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Register a new user</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/auth/register</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>
            Body: 
            <ul class="ms-5">
                <li>
                    JSON:
                    <span class="text-indigo-500 ms-2 px-2 py-1rounded">
                        <pre class="p-4 rounded-lg"> 
                            <code class="language-typescript">
                                {
                                    username: string,
                                    firstname: string,
                                    lastname: string,
                                    email: string, # must be valid email
                                    password: string,
                                    password_confirmation: string, # must be the same as password
                                }
                            </code>
                        </pre>
                    </span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->register_user }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="login-user">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Login user</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/auth/login</span></li>
        <li>Method: <span class="text-orange-500 ms-2 px-2 py-1 bg-gray-100 rounded">POST</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->login_user }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="logged-user">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get logged user</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/auth/me</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>
            <span>Header: </span>
            <ul class="ms-5 flex flex-col gap-2">
                <li>
                    Content-Type: 
                    <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">application/json</span>
                </li>
                <li>
                    Authorization: 
                    <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">Bearer {your_token}</span>
                </li>
            </ul>
        </li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->logged_user }} 
            </code>
        </pre>
    </ul>
</div>

<div class="my-5 scroll-m-16" id="get-user-by-username">
    <h3 class="text-xl ps-5 py-1 border-s-4 border-indigo-500">Get user by username</h3>
    <ul class="mt-5 flex flex-col gap-2">
        <li>URL: <span class="text-indigo-500 ms-2 px-2 py-1 bg-gray-100 rounded">/user/{username}</span></li>
        <li>Method: <span class="text-emerald-700 ms-2 px-2 py-1 bg-gray-100 rounded">GET</span></li>
        <li>Response: </li>
        <pre class="p-4 rounded-lg"> 
            <code class="language-json">
                {{ $documentation->get_user_by_username }} 
            </code>
        </pre>
    </ul>
</div>