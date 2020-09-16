<template>
  <div>
    <a v-bind:href="logout" @click.prevent="clickLogout">Logout</a>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      logout: "/logout",
    };
  },

  methods: {
    clickLogout() {
      document.getElementById("logout-form").submit();
    },
  },
};
</script>

<style>
</style>