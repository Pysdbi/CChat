/**
 * Store Chats State
 *
 * @returns {{
 *      chats: [
 *          {
 *              lastMessage: {
 *                  isFromSelf: boolean,
 *                  dateOrTime: string,
 *                  content: string,
 *                  status: string
 *              },
 *              id: number,
 *              avatar: string,
 *              login: string,
 *              username: string,
 *              history: {
 *                  isSelf: string,
 *                  messages: string[]
 *              }[]
 *          }
 *      ]
 * }}
 */
export const state = () => ({
    chats: [
        {
            id: 0,
            login: "greenronja",
            username: "Пупкин",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            lastMessage: {
                content: "Привет",
                isFromSelf: false,
                status: "notSeen",
                dateOrTime: "12:38"
            },
            history: [
                {
                    messages: [
                        "Can be verified on any platform using docker"
                    ]
                },
                {
                    isSelf: true,
                    messages: [
                        "Your error message says permission denied, npm global installs must be given root privileges."
                    ]
                },

                {
                    messages: [
                        "Command was run with root privileges. I'm sure about that.",
                        "I've update the description so it's more obviously now",
                        "FYI https://askubuntu.com/a/700266/510172"
                    ]
                },
                {
                    isSelf: true,
                    messages: [
                        "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks"
                    ]
                },

                {
                    messages: [
                        "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks"
                    ]
                },
                {
                    isSelf: true,
                    messages: [
                        "Are you using sudo?",
                        "Run this command sudo chown -R `whoami` /Users/your_user_profile/.npm-global/ then install the package globally without using sudo"
                    ]
                },

                {
                    messages: [
                        "It seems like you are from Mac OS world. There is no /Users/ folder on linux 😄",
                        "I have no issue with any other packages installed with root permission globally."
                    ]
                },
                {
                    isSelf: true,
                    messages: [
                        "yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem"
                    ]
                },

                {
                    messages: [
                        "I get the same error on Arch Linux (also with sudo)",
                        "I also have this issue, Here is what I was doing until now: #1076",
                        "even i am facing"
                    ]
                }
            ]
        },
        {
            id: 1,
            login: "infasia",
            username: "Дениска",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            lastMessage: {
                content: "Как дела?",
                isFromSelf: true,
                status: "seen",
                dateOrTime: "19:51"
            },
            history: []
        },
        {
            id: 2,
            login: "teegron",
            username: "Иван",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            lastMessage: {
                content: "Ты кто?",
                isFromSelf: false,
                status: "Seen",
                dateOrTime: "23:25"
            },
            history: []
        },
        {
            id: 3,
            login: "nataly",
            username: "Петя",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            lastMessage: {
                content: "У меня к тебе дело...",
                isFromSelf: true,
                status: "notSeen",
                dateOrTime: "05.03.2022"
            },
            history: []
        }
    ]
});
export const getters = {
    getChats: (state) => state.chats
};

/**
 *
 * @type {{pushMessage: (function(*, *): *), setChatsState: (function(*, *): *)}}
 */
export const mutations = {
    setChatsState: (state, chats) => (state.chats = chats),
    pushMessage: (state, payload = { chatId: -1, isSelf: true, message: null }) => {
        const lastBlockInd = state.chats.find(x => x.id === payload.chatId).history?.length - 1 || -1;
        // eslint-disable-next-line no-console
        if(lastBlockInd >= 0){
            const lastBlock = state.chats.find(x => x.id === payload.chatId).history[lastBlockInd];
            if (lastBlock.isSelf === payload.isSelf) {
                lastBlock.messages.push(payload.message);
            }
        } else {
            state.chats.find(x => x.id === payload.chatId).history.push({
                ...(payload.isSelf && ({ isSelf: true })),
                messages: [payload.message]
            });
        }

    }
};

export const actions = {};

