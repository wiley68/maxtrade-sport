<template>
  <div>
    <a v-bind:href="getLogout" @click.prevent="clickLogout">Logout</a>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  computed: mapGetters(["getLogout"]),

  methods: {
    ...mapActions(["clickLogout"]),
  },
};
</script>

<style>
</style>