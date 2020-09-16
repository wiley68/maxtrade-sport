import Vue from "vue";
import App from "./components/App";
import router from "./router";

require("./bootstrap");

const app = new Vue({
    el: "#app",
    components: {
        App
    },
    router
});
