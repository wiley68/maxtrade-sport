import Vue from "vue";
import App from "./components/App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: {
        App
    },
    router,
    store,
    vuetify
});
