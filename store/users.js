/**
 * Store Users State
 * @returns {{
 *          currentUser: {
 *              avatar: string,
 *              login: string,
 *              username: string
 *          }
 *      }}
 */
export const state = () => ({
    currentUser: {
        login: "pysdbi",
        username: "Дмитрий",
        avatar: "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
    }
});
export const getters = {
    getCurrentUser: (state) => state.currentUser
};

export const mutations = {
    setCurrentChat: (state, user) => (state.currentUser = user)
};

export const actions = {};

