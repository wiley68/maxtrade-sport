import Vue from "vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

require("./bootstrap");
import Routes from "./routes";
import App from "./views/App.vue";

const app = new Vue({
    el: "#app",
    components: {
        App
    },
    store,
    vuetify,
    router: Routes
});
