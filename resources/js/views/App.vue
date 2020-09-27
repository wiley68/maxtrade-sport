<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link to="/app">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/stat">
          <v-list-item-action>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Stat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/chart">
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
      <v-toolbar-title
        ><a class="blue--text text--lighten-5 text-decoration-none" href="/app"
          >Maxtrade Sport</a
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn to="/app" text> Home </v-btn>
      <v-btn to="/stat" text> Stat </v-btn>
      <v-btn to="/chart" text> Chart </v-btn>
      <v-btn icon @click.prevent="clickLogout">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
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

export default {
  name: "App",

  components: {},

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