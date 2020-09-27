import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import Stat from "./components/Stat.vue";
import Chart from "./components/Chart.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/app",
            name: "home",
            component: Home
        },
        {
            path: "/stat",
            name: "stat",
            component: Stat
        },
        {
            path: "/chart",
            name: "chart",
            component: Chart
        }
    ]
});

export default router;
