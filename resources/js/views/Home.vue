<template>
  <v-container fluid>
    <v-row align="start" justify="start">
      <v-col class="d-flex" cols="12" sm="4">
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="getSports"
              item-value="id"
              item-text="name"
              label="Sport"
              :loading="loading"
              no-data-text="Choose Sport..."
              placeholder="Choose Sport..."
              prepend-inner-icon="mdi-soccer-field"
              return-object
              :value="getSport"
              @change="changeSport"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-btn class="mx-1" fab small color="primary">
              <v-icon dark>mdi-playlist-plus</v-icon>
            </v-btn>
            <v-btn class="mx-1" fab small color="success" :disabled="getSport.id == 0">
              <v-icon dark>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn class="mx-1" fab small color="error" :disabled="getSport.id == 0">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" sm="8"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getSports", "getSport"]),
  },

  methods: {
    ...mapActions(["changeSport"]),
  },
};
</script>

<style scoped>
</style>