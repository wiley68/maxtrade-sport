<template>
  <v-container class="fill-height" fluid>
    <v-row :align="start" :justify="start">
      <v-col cols="4">111</v-col>
      <v-col cols="8">111</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      start: "start",
    };
  },
};
</script>

<style scoped>
</style>