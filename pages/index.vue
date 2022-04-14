<template>
    <div class="h-full">
        <div
            v-if="!chat"
            class="h-full flex justify-center items-center  text-center  text-gray-900 dark:text-white text-5xl"
        >
            Welcome to Chat
            <br>
            🥳 🐼 🎉 🎊
        </div>

        <div
            v-else
            class="h-full flex flex-col overflow-y-auto"
        >
            <div class="h-[64px] flex items-center px-2.5 py-4 shadow-md dark:bg-gray-800">
                <div
                    class="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors ease-in-out mr-2"
                    @click="exitChat"
                >
                    <svg
                        class="sm:hidden h-8 w-8" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                </div>
                <v-avatar
                    :src="chat.avatar"
                    size="42"
                    class="mr-3"
                />
                <div class="flex flex-col w-full">
                    <div class="text text-gray-900 dark:text-white">
                        {{ chat.username }}
                    </div>
                    <div class="text-xs text-gray-900/40 dark:text-white/40 font-light">
                        Не в сети
                    </div>
                </div>
            </div>

            <div ref="history" class="h-full flex flex-col space-y-4 p-3 overflow-y-auto">
                <div
                    v-for="(blockMessage, ind) in chat.history"
                    :key="ind"
                    class="flex items-end"
                    :class="{'justify-end': blockMessage.isSelf}"
                >
                    <div
                        class="flex flex-col space-y-2 text-xs max-w-md mx-2 items-start"
                        :class="{
                            'order-1 items-end' : blockMessage.isSelf,
                            'order-2 items-start': !blockMessage.isSelf
                        }"
                    >
                        <div
                            v-for="(msg, msgInd) in blockMessage.messages"
                            :key="blockMessage.login + ind + '_' + msgInd"
                        >
                            <div
                                class="px-4 py-2 rounded-lg inline-block flex flex-col"
                                :class="{
                                    'bg-blue-600 text-white': blockMessage.isSelf,
                                    'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200': !blockMessage.isSelf,
                                    'rounded-br-none': blockMessage.isSelf && msgInd === blockMessage.messages.length - 1,
                                    'rounded-bl-none': !blockMessage.isSelf && msgInd === blockMessage.messages.length - 1,
                                }"
                            >
                                {{ msg.content }}
                                <div
                                    class="text-[.65rem] flex justify-end"
                                    :class="[blockMessage.isSelf ? 'text-gray-300': 'text-gray-500']"
                                >
                                    {{ msg.dispatchTime }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-avatar
                        :src="blockMessage.isSelf ? currentUser.avatar : chat.avatar"
                        size="24"
                        class="order-1"
                    />
                </div>
            </div>

            <div
                class="h-[64px] max-h-[128px] flex items-center gap-2 px-4 pb-4 pt-2 w-full border-t border-gray-900/20 dark:border-white/20 select-none"
            >
                <div class="flex items-center justify-center cursor-pointer">
                    <svg
                        class="h-7 w-7 text-gray-900 dark:text-white" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path
                            d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                    </svg>
                </div>
                <label class="w-full h-full overflow-hidden relative block">
                    <span class="sr-only">Сообщение</span>
                    <textarea
                        v-model="inputMessage"
                        class="placeholder:text-gray-500 block text-gray-900 dark:text-white bg-transparent w-full py-2 px-3 focus:outline-none sm:text-sm resize-none"
                        rows="1"
                        placeholder="Сообщение..."
                        name="message"
                        @keydown.shift.enter="newLine"
                        @keydown.enter.prevent.exact="!disableSendBtn && sendMessage()"
                    />
                </label>

                <div class="flex items-center justify-center cursor-pointer">
                    <svg
                        class="h-7 w-7 text-gray-900 dark:text-white" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                        <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                    </svg>
                </div>
                <div
                    class="flex items-center justify-center cursor-pointer"
                    :class="[disableSendBtn && 'cursor-not-allowed opacity-50']"
                    @click="!disableSendBtn && sendMessage()"
                >
                    <svg
                        class="h-7 w-7 text-blue-500" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "IndexPage",
    asyncData({ store }) {
        store.commit("messenger/setCurrentChat", store.state.chats.chats[0]);
    },
    data: () => ({
        inputMessage: null
    }),
    computed: {
        ...mapGetters("users", {
            currentUser: "getCurrentUser"
        }),
        chat() {
            return this.$store.getters["messenger/getCurrentChat"];
        },
        chatHistoryChanged() {
            return this.chat?.history?.reduce((x, y) => x.messages?.length + y.messages?.length, 0);
        },

        disableSendBtn() {
            return !this.inputMessage?.replaceAll(" ", "")?.length;
        }
    },
    watch: {
        chatHistoryChanged() {
            this.$nextTick(() => this.toLast());
        }
    },
    mounted() {
        this.toLast();
    },
    methods: {
        ...mapMutations("messenger", {
            changeCurrentChat: "setCurrentChat"
        }),

        toLast() {
            this.$refs.history?.scrollTo({
                top: this.$refs.history.scrollHeight,
                behavior: "smooth"
            });
        },

        exitChat() {
            this.changeCurrentChat(null);
            this.inputMessage = null;
        },

        async sendMessage() {
            await this.$store.dispatch("messenger/sendMessage", this.inputMessage);
            this.inputMessage = null;
        },

        newLine(e) {
            const caret = e.target.selectionStart;
            e.target.setRangeText("\n", caret, caret, "end");
            e.target.rows = +(e.target.rows) + 1;
        }
    }
};
</script>
