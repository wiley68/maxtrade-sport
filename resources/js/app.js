import Vue from "vue";
import App from "./components/App";
import router from "./router";
import store from "./store";

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: {
        App
    },
    router,
    store
});
