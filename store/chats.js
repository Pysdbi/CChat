const getCurrentDateTime = () => {
    const time = new Date();
    return [time.getHours(), time.getMinutes()].join(":");
};

/**
 * Store Chats State
 *
 * @returns {{
 *      chats: [
 *          {
 *              lastMessage: {
 *                  isSelf: boolean,
 *                  dispatchTime: string,
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
            history: [
                {
                    isSelf: false,
                    dispatchTime: "12:38",
                    messages: [
                        { content: "Can be verified on any platform using docker", dispatchTime: "12:38" }
                    ]
                },
                {
                    isSelf: true,
                    dispatchTime: "12:41",
                    messages: [
                        {
                            content: "Your error message says permission denied, npm global installs must be given root privileges.",
                            dispatchTime: "12:41"
                        }
                    ]
                },
                {
                    isSelf: false,
                    dispatchTime: "12:55",
                    messages: [
                        {
                            content: "Command was run with root privileges. I'm sure about that.",
                            dispatchTime: "12:55"
                        },
                        {
                            content: "I've update the description so it's more obviously now",
                            dispatchTime: "12:55"
                        },
                        { content: "FYI https://askubuntu.com/a/700266/510172", dispatchTime: "12:55" }
                    ]
                }, {
                    isSelf: true,
                    dispatchTime: "13:38",
                    messages: [
                        {
                            content: "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks",
                            dispatchTime: "13:38"
                        }
                    ]
                }, {
                    isSelf: false,
                    dispatchTime: "14:38",
                    messages: [
                        {
                            content: "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks",
                            dispatchTime: "14:38"
                        }
                    ]
                }, {
                    isSelf: true,
                    dispatchTime: "15:38",
                    messages: [
                        {
                            content: "Are you using sudo?",
                            dispatchTime: "15:38"
                        },
                        {
                            content: "Run this command sudo chown -R `whoami` /Users/your_user_profile/.npm-global/ then install the package globally without using sudo",
                            dispatchTime: "15:38"
                        }
                    ]
                }, {
                    isSelf: false,
                    dispatchTime: "23:38",
                    messages: [
                        {
                            content: "It seems like you are from Mac OS world. There is no /Users/ folder on linux 😄",
                            dispatchTime: "23:38"
                        },
                        {
                            content: "I have no issue with any other packages installed with root permission globally.",
                            dispatchTime: "23:38"
                        }
                    ]
                }, {
                    isSelf: true,
                    dispatchTime: "23:39",
                    messages: [
                        {
                            content: "yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem",
                            dispatchTime: "23:39"
                        }
                    ]
                }, {
                    isSelf: false,
                    dispatchTime: "23:45",
                    messages: [
                        {
                            content: "I get the same error on Arch Linux (also with sudo)",
                            dispatchTime: "23:45"
                        },
                        {
                            content: "I also have this issue, Here is what I was doing until now: #1076",
                            dispatchTime: "23:45"
                        },
                        { content: "even i am facing", dispatchTime: "23:45" }
                    ]
                }]
        },
        {
            id: 1,
            login: "infasia",
            username: "Дениска",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            history: []
        },
        {
            id: 2,
            login: "teegron",
            username: "Иван",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            history: []
        },
        {
            id: 3,
            login: "nataly",
            username: "Петя",
            avatar: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144",
            history: []
        }
    ]
});

const getLastMessage = (chat) => {
    const lastMsg = chat.history.slice(-1).pop();
    return {
        content: lastMsg?.messages.slice(-1).pop().content,
        isSelf: lastMsg?.isSelf,
        status: "notSeen",
        dispatchTime: lastMsg?.messages.slice(-1).pop()?.dispatchTime
    };
};
export const getters = {
    getChats: (state) => state.chats.map(x => ({
        ...x,
        lastMessage: getLastMessage(x)
    }))
};

/**
 *
 * @type {{pushMessage: (function(*, *): *), setChatsState: (function(*, *): *)}}
 */
export const mutations = {
    setChatsState: (state, chats) => (state.chats = chats),
    pushMessage: (state, payload = { chatId: -1, isSelf: true, message: null }) => {
        const lastBlockInd = state.chats.find(x => x.id === payload.chatId).history?.length - 1 || -1;
        const chat = state.chats.find(x => x.id === payload.chatId);
        if (lastBlockInd >= 0) {
            const lastBlock = chat.history[lastBlockInd];
            if (lastBlock.isSelf === payload.isSelf) {
                lastBlock.messages.push({
                    content: payload.message,
                    dispatchTime: getCurrentDateTime()
                });
                return null;
            }
        }
        chat.history.push({
            isSelf: payload.isSelf,
            dispatchTime: getCurrentDateTime(),
            messages: [{
                content: payload.message,
                dispatchTime: getCurrentDateTime()
            }]
        });
    }
};

export const actions = {};

