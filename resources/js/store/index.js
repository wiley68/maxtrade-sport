import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    state: {
        logout: "/logout",
        loading: false,
        sports: [],
        sport: { id: 0, name: "" },
        new_sport: true,
        events: [],
        event: { id: 0, sport_id: 0, name: "" },
        new_event: true,
        koeficient: 1,
        zalog: 0,
        bets: [],
        bet: [
            {
                id: 0,
                sport_id: 0,
                event_id: 0,
                koeficient: 1,
                zalog: 0,
                status: 0,
                win: 0
            }
        ],
        new_bet: true,
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

    getters: {},

    actions: {
        clickLogout() {
            document.getElementById("logout-form").submit();
        },
        async fetchData({ commit }) {
            commit("setLoading", true);
            const responseSports = await axios.get("api/sports");
            const sports = responseSports.data.data;
            commit("setSports", sports);
            const responseEvents = await axios.get("api/events");
            const events = responseEvents.data.data;
            commit("setEvents", events);
            const responseBets = await axios.get("api/bets");
            const bets = responseBets.data.data;
            commit("setBets", bets);
            commit("setLoading", false);
        },
        async saveSport({ commit, state }, param) {
            let response = null;
            if (param.new) {
                commit("setLoading", true);
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
                commit("setLoading", false);
            } else {
                // edit sport
                commit("setLoading", true);
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
                commit("setLoading", false);
            }
        },
        async saveEvent({ commit, state }, param) {
            let response = null;
            if (param.new) {
                // new event
                commit("setLoading", true);
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
                commit("setLoading", false);
            } else {
                // edit event
                commit("setLoading", true);
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
                commit("setLoading", false);
            }
        },
        async deleteSport({ commit, state }) {
            if (state.sport.id != 0) {
                commit("setLoading", true);
                const response = await axios.delete(
                    "api/sport/" + state.sport.id
                );
                commit(
                    "setSports",
                    state.sports.filter(s => s.id !== response.data.data.id)
                );
                commit("setSport", { id: 0, name: "" });
                commit("setLoading", false);
            }
        },
        async deleteEvent({ commit, state }) {
            if (state.event.id != 0) {
                commit("setLoading", true);
                const response = await axios.delete(
                    "api/event/" + state.event.id
                );
                commit(
                    "setEvents",
                    state.events.filter(e => e.id !== response.data.data.id)
                );
                commit("setEvent", { id: 0, sport_id: 0, name: "" });
                commit("setLoading", false);
            }
        },
        async saveBet({ commit, state }, param) {
            let response = null;
            if (param.new) {
                // new bet
                commit("setLoading", true);
                response = await axios.post(
                    "api/bet",
                    {
                        bet_id: 0,
                        sport_id: state.sport.id,
                        event_id: state.event.id,
                        koeficient: state.koeficient,
                        zalog: state.zalog,
                        status: state.status,
                        win: state.win
                    },
                    { "Content-Type": "application/json; charset=utf-8" }
                );
                const newBet = {
                    id: response.data.data.id,
                    sport_id: response.data.data.sport_id,
                    event_id: response.data.data.event_id,
                    koeficient: response.data.data.koeficient,
                    zalog: response.data.data.zalog,
                    status: response.data.data.status,
                    win: response.data.data.win
                };
                state.bets.unshift(newBet);
                const betarr = [];
                betarr.unshift(newBet);
                commit("setBet", betarr);
                commit("setLoading", false);
            } else {
                // edit bet
                commit("setLoading", true);
                const firstBet = state.bet
                    .filter(b => typeof b !== undefined)
                    .shift();
                response = await axios.put(
                    "api/bet",
                    {
                        bet_id: firstBet.id,
                        sport_id: state.sport.id,
                        event_id: state.event.id,
                        koeficient: state.koeficient,
                        zalog: state.zalog,
                        status: state.status,
                        win: state.win
                    },
                    { "Content-Type": "application/json; charset=utf-8" }
                );
                const newBet = {
                    id: response.data.data.id,
                    sport_id: response.data.data.sport_id,
                    event_id: response.data.data.event_id,
                    koeficient: response.data.data.koeficient,
                    zalog: response.data.data.zalog,
                    status: response.data.data.status,
                    win: response.data.data.win
                };
                const responseBets = await axios.get("api/bets");
                const bets = responseBets.data.data;
                commit("setBets", bets);
                const betarr = [];
                betarr.unshift(newBet);
                commit("setBet", betarr);
                commit("setLoading", false);
            }
        },
        async deleteBet({ commit, state, dispatch }) {
            const firstItem = state.bet
                .filter(x => typeof x !== undefined)
                .shift();
            if (firstItem.id != 0) {
                commit("setLoading", true);
                const response = await axios.delete("api/bet/" + firstItem.id);
                commit(
                    "setBets",
                    state.bets.filter(b => b.id !== response.data.data.id)
                );
                dispatch("clearAll");
                commit("setLoading", false);
            }
        },
        clearAll({ state, commit }) {
            const newBet = {
                id: 0,
                sport_id: 0,
                event_id: 0,
                koeficient: 1,
                zalog: 0,
                status: 0,
                win: 0
            };
            state.bet[0] = newBet;
            commit("setNewBet", true);
            commit("setSport", { id: 0, name: "" });
            commit("setEvent", { id: 0, sport_id: 0, name: "" });
            commit("setKoeficient", 1);
            commit("setZalog", 0);
            commit("setStatus", 0);
            commit("setWin", 0);
        }
    },

    mutations: {
        setSport: (state, sport) => (state.sport = sport),
        setSports: (state, sports) => (state.sports = sports),
        setNewSport: (state, new_sport) => (state.new_sport = new_sport),
        setEvent: (state, event) => (state.event = event),
        setEvents: (state, events) => (state.events = events),
        setNewEvent: (state, new_event) => (state.new_event = new_event),
        setKoeficient: (state, koeficient) => (state.koeficient = koeficient),
        setZalog: (state, zalog) => (state.zalog = zalog),
        setBet: (state, bet) => (state.bet = bet),
        setBets: (state, bets) => (state.bets = bets),
        setNewBet: (state, new_bet) => (state.new_bet = new_bet),
        setWin: (state, win) => (state.win = win),
        setStatus: (state, status) => (state.status = status),
        setLoading: (state, loading) => (state.loading = loading)
    }
});
