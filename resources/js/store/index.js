import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    state: {
        logout: "/logout",
        sports: [],
        sport: { id: 0, name: "" },
        events: [],
        event: { id: 0, sport_id: 0, name: "" },
        koeficient: 1,
        zalog: 0,
        bets: [],
        bet: {
            id: 0,
            sport_id: 0,
            event_id: 0,
            koeficient: 1,
            zalog: 0,
            status: 0,
            win: 0
        },
        headers: [
            { text: "Id", value: "id" },
            { text: "Sport", value: "sport_id" },
            { text: "Event", value: "event_id" },
            { text: "Koeficient", value: "koeficient" },
            { text: "Bet", value: "zalog" },
            { text: "Win", value: "win" },
            { text: "Status", value: "status" }
        ],
        win: 0,
        status: 0
    },

    getters: {
        getSport: state => state.sport,
        getSports: state => state.sports,
        getEvent: state => state.event,
        getEvents: state => state.events,
        getKoeficient: state => state.koeficient,
        getZalog: state => state.zalog,
        getBet: state => state.bet,
        getBets: state => state.bets,
        getHeaders: state => state.headers,
        getWin: state => state.win,
        getStatus: state => state.status
    },

    actions: {
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
            const responseBets = await axios.get("api/bets");
            const bets = responseBets.data.data;
            commit("setBets", bets);
        },
        changeSport({ commit }, sport) {
            commit("setSport", sport);
            commit("setEvent", { id: 0, sport_id: 0, name: "" });
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
                state.sports.find(s => s.id === newSport.id).name =
                    newSport.name;
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
                state.events.find(e => e.id === newEvent.id).name =
                    newEvent.name;
                commit("setEvent", newEvent);
            }
        },
        async deleteSport({ commit, state }) {
            if (state.sport.id != 0) {
                const response = await axios.delete(
                    "api/sport/" + state.sport.id
                );
                commit(
                    "setSports",
                    state.sports.filter(s => s.id !== response.data.data.id)
                );
                commit("setSport", { id: 0, name: "" });
            }
        },
        async deleteEvent({ commit, state }) {
            if (state.event.id != 0) {
                const response = await axios.delete(
                    "api/event/" + state.event.id
                );
                commit(
                    "setEvents",
                    state.events.filter(e => e.id !== response.data.data.id)
                );
                commit("setEvent", { id: 0, sport_id: 0, name: "" });
            }
        }
    },

    mutations: {
        setSport: (state, sport) => (state.sport = sport),
        setSports: (state, sports) => (state.sports = sports),
        setEvent: (state, event) => (state.event = event),
        setEvents: (state, events) => (state.events = events),
        setKoeficient: (state, koeficient) => (state.koeficient = koeficient),
        setZalog: (state, zalog) => (state.zalog = zalog),
        setBet: (state, bet) => (state.bet = bet),
        setBets: (state, bets) => (state.bets = bets),
        setWin: (state, win) => (state.win = win),
        setStatus: (state, status) => (state.status = status)
    }
});
