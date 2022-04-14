/**
 * Store Messenger State
 *
 * @returns {{
 *      currentChat: {
 *          lastMessage: {
 *              isSelf: boolean,
 *              dispatchTime: string,
 *              content: string,
 *              status: string
 *          },
 *          id: number,
 *          avatar: string,
 *          login: string,
 *          username: string,
 *          history: {
 *              isSelf: string,
 *              messages: string[]
 *          }[]
 *      }
 * }}
 */
export const state = () => ({
    currentChat: null
});
export const getters = {
    getCurrentChat: (state) => state.currentChat
};

export const mutations = {
    setCurrentChat: (state, chat) => (state.currentChat = chat ?? null)
};

export const actions = {
    sendMessage(context, message) {
        context.commit("chats/pushMessage", {
            chatId: context.getters.getCurrentChat.id,
            isSelf: true,
            message
        }, { root: true });


        // От 10 до 60 секунд собеседник ответит
        const timeoutAns = (Math.random() * (12 - 10) + 10);
        setTimeout(
            (chatId, message) => {
                context.commit("chats/pushMessage", {
                    chatId,
                    isSelf: false,
                    message
                }, { root: true });
            },
            timeoutAns * 1000,
            context.getters.getCurrentChat.id,
            message
        );
    }
};

