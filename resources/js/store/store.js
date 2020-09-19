import axios from "axios";

const state = {
    logout: "/logout",
    sports: [],
    sport: { id: 0, name: "" },
    events: [],
    event: { id: 0, sport_id: 0, name: "" }
};

const getters = {
    getSport: state => state.sport,
    getSports: state => state.sports,
    getEvent: state => state.event,
    getEvents: state => state.events
};

const actions = {
    clickLogout() {
        document.getElementById("logout-form").submit();
    },
    async fetchData({ commit }) {
        const responseSports = await axios.get("api/sports");
        const sports = responseSports.data.data;
        commit("setSports", sports);
        const responseEvents = await axios.get("api/events");
        const events = responseEvents.data.data;
        commit("setEvents", events);
    },
    changeSport({ commit }, sport) {
        commit("setSport", sport);
    },
    changeEvent({ commit }, event) {
        commit("setEvent", event);
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
    async saveEvent({ commit, state }, param) {
        let response = null;
        if (param.new) {
            // new event
            response = await axios.post(
                "api/event",
                {
                    event_id: 0,
                    sport_id: state.sport.id,
                    name: param.name
                },
                { "Content-Type": "application/json; charset=utf-8" }
            );
            const newEvent = {
                id: response.data.data.id,
                sport_id: response.data.data.sport_id,
                name: response.data.data.name
            };
            state.events.unshift(newEvent);
            commit("setEvent", newEvent);
        } else {
            // edit event
            response = await axios.put(
                "api/event",
                {
                    event_id: state.event.id,
                    sport_id: state.sport.id,
                    name: param.name
                },
                { "Content-Type": "application/json; charset=utf-8" }
            );
            const newEvent = {
                id: response.data.data.id,
                sport_id: response.data.sport_id,
                name: response.data.data.name
            };
            state.events.find(e => e.id === newEvent.id).name = newEvent.name;
            commit("setEvent", newEvent);
        }
    },
    async deleteSport({ commit, state }) {
        if (state.sport.id != 0) {
            const response = await axios.delete("api/sport/" + state.sport.id);
            commit(
                "setSports",
                state.sports.filter(s => s.id !== response.data.data.id)
            );
            commit("setSport", { id: 0, name: "" });
        }
    },
    async deleteEvent({ commit, state }) {
        if (state.event.id != 0) {
            const response = await axios.delete("api/event/" + state.event.id);
            commit(
                "setEvents",
                state.events.filter(e => e.id !== response.data.data.id)
            );
            commit("setEvent", { id: 0, sport_id: 0, name: "" });
        }
    }
};

const mutations = {
    setSport: (state, sport) => (state.sport = sport),
    setSports: (state, sports) => (state.sports = sports),
    setEvent: (state, event) => (state.event = event),
    setEvents: (state, events) => (state.events = events)
};

export default {
    state,
    getters,
    actions,
    mutations
};
