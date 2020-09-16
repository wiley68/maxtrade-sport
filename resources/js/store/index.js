import Vuex from "vuex";
import Vue from "vue";

import Store from "./store";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        Store
    }
});
