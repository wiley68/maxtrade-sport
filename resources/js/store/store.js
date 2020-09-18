import axios from "axios";

const state = {
    logout: "/logout",
    sports: [],
    sport: { id: 0, name: "" }
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
    },
    async saveSport({ commit, state }, param) {
        let response = null;
        if (param.new) {
            // new sport
            response = await axios.post(
                "api/sport",
                {
                    sport_id: 0,
                    name: param.name
                },
                { "Content-Type": "application/json; charset=utf-8" }
            );
            const newSport = {
                id: response.data.data.id,
                name: response.data.data.name
            };
            state.sports.unshift(newSport);
            commit("setSport", newSport);
        } else {
            // edit sport
            response = await axios.put(
                "api/sport",
                {
                    sport_id: state.sport.id,
                    name: param.name
                },
                { "Content-Type": "application/json; charset=utf-8" }
            );
            const newSport = {
                id: response.data.data.id,
                name: response.data.data.name
            };
            state.sports.find(s => s.id === newSport.id).name = newSport.name;
            commit("setSport", newSport);
        }
    },
    async deleteSport({ commit, state }) {
        if (state.sport.id != 0) {
            if (confirm("Are You sure?")) {
                const response = await axios.delete(
                    "api/sport/" + state.sport.id
                );
                commit(
                    "setSports",
                    state.sports.filter(s => s.id !== response.data.data.id)
                );
                commit("setSport", { id: 0, name: "" });
            }
        }
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
