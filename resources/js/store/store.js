const state = {
    logout: "/logout"
};

const getters = {
    getLogout: state => state.logout
};

const actions = {
    clickLogout() {
        document.getElementById("logout-form").submit();
    }
};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};
