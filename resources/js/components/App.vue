<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link href="/app">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/stat">
          <v-list-item-action>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Stat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/chart">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark dense collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Maxtrade Sport</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="clickLogout">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <home v-if="route == 'app'"></home>
      <stat v-if="route == 'stat'"></stat>
      <chart v-if="route == 'chart'"></chart>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text"
        >Avalon &copy; {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Home from "./Home";
import Stat from "./Stat";
import Chart from "./Chart";

export default {
  name: "App",

  components: {
    Home,
    Stat,
    Chart,
  },

  props: ["route"],

  data: () => ({
    drawer: false,
  }),

  async created() {
    await this.fetchData();
  },

  computed: mapGetters([]),

  methods: {
    ...mapActions(["clickLogout", "fetchData"]),
  },
};
</script>

<style>
</style>