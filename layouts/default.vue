<template>
    <div class="flex items-stretch h-screen overflow-hidden dark:bg-gray-900">
        <aside
            class="absolute sm:static sm:block w-screen sm:w-80 h-screen shadow-md border-r border-gray-900/20 dark:border-white/20 z-50"
            :class="{
                'hidden': currentChat,
            }"
            aria-label="Sidebar"
        >
            <div class="h-full flex flex-col overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <!-- Profile -->
                <div class="h-[64px] flex items-center px-2.5 py-2 mb-2 shadow-md">
                    <v-avatar
                        :src="currentUser.avatar"
                        size="48"
                        class="mr-3"
                    />
                    <div class="flex flex-col w-full">
                        <div class="text-lg text-gray-900 dark:text-white">
                            {{ currentUser.username }}
                        </div>
                        <div class="text-gray-900/40 dark:text-white/40 font-light ">
                            #{{currentUser.login}}
                        </div>
                    </div>
                    <div class="relative">
                        <div
                            class="opacity-50 hover:opacity-100 cursor-pointer transition-opacity ease-in-out"
                            @click.stop="isOpenProfileMenu = !isOpenProfileMenu">
                            <svg
                                class="h-6 w-6 rotate-90 text-gray-900 dark:text-white" width="24" height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="5" cy="12" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                            </svg>
                        </div>

                        <transition
                            enter-active-class="transition ease-out duration-300"
                            enter-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <div
                                v-show="isOpenProfileMenu"
                                v-click-outside="closeProfileMenu"
                                class="absolute right-0 w-48 rounded shadow-lg z-50"
                            >
                                <div
                                    class="py-2 rounded-md bg-gray-50/95 dark:dark:bg-gray-900/95 shadow-2xl"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="profile-menu"
                                >
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-900/90 dark:text-white/90 hover:bg-gray-300 dark:hover:bg-gray-800"
                                        role="menuitem"
                                    >Profile</a>
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-900/90 dark:text-white/90 hover:bg-gray-300 dark:hover:bg-gray-800"
                                        role="menuitem"
                                    >Settings</a>
                                    <a
                                        href="#"
                                        class="block px-4 py-2 text-sm text-gray-900/90 dark:text-white/90 hover:bg-gray-300 dark:hover:bg-gray-800"
                                        role="menuitem"
                                    >Sign out</a>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

                <!-- Search -->
                <label class="relative block mb-3 mx-2">
                    <span class="sr-only">Поиск</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                            class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="10" cy="10" r="7" />  <line
                                x1="21"
                                y1="21"
                                x2="15"
                                y2="15" />
                        </svg>
                    </span>
                    <input
                        v-model="inputSearch"
                        class="placeholder:italic placeholder:text-gray-500 block text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 w-full border border-transparent focus:border-gray-500 rounded py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
                        placeholder="Поиск" type="text" name="search"
                    />
                </label>

                <!-- Chats -->
                <div class="h-full overflow-y-auto">
                    <ul class="flex flex-col gap-y-1 divide-y-[.5px] divide-gray-900/10 dark:divide-white/10 select-none">
                        <!--                    <li class="flex p-2 hover:bg-gray-900 hover:bg-opacity-30 transition-all ease-in-out">
                        <div class="w-16 flex items-center">
                            <img
                                class="rounded-full"
                                src="~/assets/img/veronika.jpeg" alt=""
                            />
                        </div>
                        <div class="ml-3 overflow-hidden w-full">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Вероника 1 ❤</p>
                            <p class="text-sm text-gray-900 dark:text-white text-opacity-50 truncate">Ты в зал?</p>
                        </div>
                        <div class="w-24 grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-2">
                            <svg class="h-4 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <polyline points="12 7 12 12 15 15" /></svg>
                            <div class="h-4 text-gray-500 text-[.65rem]">
                                20:25
                            </div>
                        </div>
                    </li>
                    <li class="flex p-2 hover:bg-gray-900 hover:bg-opacity-30 transition-all ease-in-out">
                        <div class="w-16 flex items-center">
                            <img
                                class="rounded-full"
                                src="~/assets/img/veronika.jpeg" alt=""
                            />
                        </div>
                        <div class="ml-3 overflow-hidden w-full">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Вероника 2 ❤</p>
                            <p class="text-sm text-gray-900 dark:text-white text-opacity-50 truncate">Как ты себя чувствуешь?</p>
                        </div>
                        <div class="w-24 grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-2">
                            <svg class="h-4 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>
                            <div class="h-4 text-gray-500 text-[.65rem]">
                                21:21
                            </div>
                        </div>
                    </li>-->
                        <li
                            v-for="chat in chats"
                            :key="chat.id"
                            class="h-[64px] flex gap-2 p-2 cursor-pointer overflow-hidden hover:bg-gray-300/30 dark:hover:bg-gray-900/30 transition-all ease-in-out"
                            @click="selectCurrentChat(chat)"
                        >
                            <v-avatar
                                :src="chat.avatar"
                                size="42"
                                class="h-full"
                            />
                            <div class="w-8/12 overflow-hidden">
                                <p class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ chat.username }}
                                </p>
                                <p class="text-sm text-gray-900 dark:text-white/50 truncate">
                                    {{ chat.lastMessage.content }}
                                </p>
                            </div>
                            <div
                                class="ml-auto grid grid-cols-2 grid-rows-2 items-center justify-items-center">
                                <svg
                                    v-if="!chat.lastMessage.isSelf"
                                    class="h-4 text-blue-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M5 12l5 5l10 -10" />
                                </svg>
                                <div
                                    class="max-w-[64px] min-w-[32px] text-gray-500 text-[.65rem] flex justify-end"
                                    :class="{'col-span-2': chat.lastMessage.isSelf}"
                                >
                                    {{ chat.lastMessage.dispatchTime }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Footer -->
                <div
                    class="h-[48px] border-t border-gray-900/20 dark:border-white/20 flex items-center">
                    <div class="cursor-pointer select-none" @click="toggleTheme">
                        <div v-if="$colorMode.preference === 'light'">
                            <!-- Light -->
                            <svg
                                class="h-8 w-8 text-gray-900" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="12" r="4" />
                                <path
                                    d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7" />
                            </svg>
                        </div>
                        <div v-else>
                            <!-- Dark -->
                            <svg
                                class="h-8 w-8 text-yellow-400" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <main class="w-full h-screen">
            <div class="w-full h-full">
                <Nuxt />
            </div>
        </main>

        <div v-if="false" class="absolute fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 bg-gray-900/75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                    class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">Deactivate
                                    account</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Are you sure you want to deactivate your account?
                                        All of your data will be permanently removed. This action cannot be undone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Deactivate
                        </button>
                        <button
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "DefaultLayout",
    data: () => ({
        isOpenProfileMenu: false,

        inputSearch: null
    }),
    computed: {
        ...mapGetters("chats", {
            getChats: "getChats"
        }),
        ...mapGetters("messenger", {
            currentChat: "getCurrentChat"
        }),
        ...mapGetters('users', {
            currentUser: 'getCurrentUser'
        }),
        chats(){
            return this.getChats.filter(x=>
                x.username.includes(this.inputSearch ?? '')
            )
        }
    },
    methods: {
        ...mapMutations("messenger", {
            "selectCurrentChat": "setCurrentChat"
        }),

        closeProfileMenu() {
            this.isOpenProfileMenu = false;
        },
        toggleTheme() {
            this.$colorMode.preference = this.$colorMode.preference === "dark" ? "light" : "dark";
        }
    }
};
</script>

