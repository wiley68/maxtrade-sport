import axios from "axios";

const state = {
    logout: "/logout",
    sports: [],
    sport: { id: 0, name: "Choose Sport..." }
};

const getters = {
    getSport: state => state.sport,
    getSports: state => state.sports
};

const actions = {
    clickLogout() {
        document.getElementById("logout-form").submit();
    },
    async fetchData({ commit }) {
        const response = await axios.get("api/sports");
        const sports = response.data.data;
        commit("setSports", sports);
    },
    changeSport({ commit }, sport) {
        commit("setSport", sport);
    }
};

const mutations = {
    setSport: (state, sport) => (state.sport = sport),
    setSports: (state, sports) => (state.sports = sports)
};

export default {
    state,
    getters,
    actions,
    mutations
};
