<aside class="w-96 min-h-screen overflow-y-auto" aria-label="Sidebar">
    <div class="px-6 py-4 min-h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <h2 class="text-2xl text-white font-bold">LearnWithLC API</h2>

        <ul class="space-y-2 mt-10">
            <li>
                <a href="#lbb-information"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fa-regular fa-building"></i>
                    <span class="ml-3">Get LBB Information</span>
                </a>
            </li>
            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-levels" data-collapse-toggle="dropdown-levels">
                    <i class="fa-solid fa-sitemap"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Levels</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-levels" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-level"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new level</a>
                    </li>
                    <li>
                        <a href="#available-levels"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get available level's</a>
                    </li>
                    <li>
                        <a href="#delete-level"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete level by id</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-users" data-collapse-toggle="dropdown-users">
                    <i class="fa-regular fa-user"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Users</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-users" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#register-user"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Register a new user</a>
                    </li>
                    <li>
                        <a href="#login-user"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Login user</a>
                    </li>
                    <li>
                        <a href="#logged-user"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get logged user</a>
                    </li>
                    <li>
                        <a href="#get-user-by-username"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get user by username</a>
                    </li>
                </ul>
            </li>
            
            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-programs" data-collapse-toggle="dropdown-programs">
                    <i class="fa-solid fa-book"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Programs</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-programs" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-program"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new program</a>
                    </li>
                    <li>
                        <a href="#get-all-program"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all program</a>
                    </li>
                    <li>
                        <a href="#get-program-by-id"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get program by id</a>
                    </li>
                    <li>
                        <a href="#update-program"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update program</a>
                    </li>
                    <li>
                        <a href="#delete-program"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete program</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-activity" data-collapse-toggle="dropdown-activity">
                    <i class="fa-regular fa-image"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Activity</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-activity" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-activity"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new activity</a>
                    </li>
                    <li>
                        <a href="#delete-activity"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete an activity by id</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-teachers" data-collapse-toggle="dropdown-teachers">
                    <i class="fa-solid fa-chalkboard-user"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Teachers</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-teachers" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-teacher"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new teacher</a>
                    </li>
                    <li>
                        <a href="#get-all-teacher"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all teacher</a>
                    </li>
                    <li>
                        <a href="#get-teacher-by-id"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get teacher by id</a>
                    </li>
                    <li>
                        <a href="#update-teacher"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update teacher</a>
                    </li>
                    <li>
                        <a href="#delete-teacher"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete teacher</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-testimonial" data-collapse-toggle="dropdown-testimonial">
                    <i class="fa-brands fa-rocketchat"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Testimonials</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-testimonial" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-testimonial"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new testimonial</a>
                    </li>
                    <li>
                        <a href="#get-all-testimonial"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all testimonial</a>
                    </li>
                    <li>
                        <a href="#get-testimonial-by-id"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get testimonial by id</a>
                    </li>
                    <li>
                        <a href="#update-testimonial"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update testimonial</a>
                    </li>
                    <li>
                        <a href="#delete-testimonial"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete testimonial</a>
                    </li>
                </ul>
            </li>
            
            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-faq" data-collapse-toggle="dropdown-faq">
                    <i class="fa-solid fa-person-circle-question"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Frequently Asked Question</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-faq" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-faq"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new faq</a>
                    </li>
                    <li>
                        <a href="#get-all-faq"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all faq</a>
                    </li>
                    <li>
                        <a href="#get-faq-by-id"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get faq by id</a>
                    </li>
                    <li>
                        <a href="#update-faq"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update faq</a>
                    </li>
                    <li>
                        <a href="#delete-faq"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete faq</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-thread" data-collapse-toggle="dropdown-thread">
                    <i class="fa-solid fa-clapperboard"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Threads</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-thread" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-thread"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new thread</a>
                    </li>
                    <li>
                        <a href="#get-all-thread"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all thread</a>
                    </li>
                    <li>
                        <a href="#get-thread-by-id"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get thread by id</a>
                    </li>
                    <li>
                        <a href="#update-thread"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update thread</a>
                    </li>
                    <li>
                        <a href="#delete-thread"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete thread</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-comment" data-collapse-toggle="dropdown-comment">
                    <i class="fa-regular fa-comment"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Comments</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-comment" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-comment"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new comment</a>
                    </li>
                    <li>
                        <a href="#get-all-comment"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all comment from a thread</a>
                    </li>
                    <li>
                        <a href="#update-comment"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update comment</a>
                    </li>
                    <li>
                        <a href="#delete-comment"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete comment</a>
                    </li>
                </ul>
            </li>

            <li>
                <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-reply" data-collapse-toggle="dropdown-reply">
                    <i class="fa-regular fa-comment"></i>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Replies</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <ul id="dropdown-reply" class="hidden py-2 space-y-2">
                    <li>
                        <a href="#post-reply"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Post a new reply</a>
                    </li>
                    <li>
                        <a href="#get-all-reply"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Get all reply from a comment</a>
                    </li>
                    <li>
                        <a href="#update-reply"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Update reply</a>
                    </li>
                    <li>
                        <a href="#delete-reply"
                            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11">Delete reply</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

    <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
</aside>