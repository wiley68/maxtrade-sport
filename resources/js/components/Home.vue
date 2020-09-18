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
            <v-dialog v-model="dialogSport" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-1" fab small color="primary" v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-playlist-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add New Sport</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Sport*" required autofocus v-model="sportName"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogSport = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="saveSportNew">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn class="mx-1" fab small color="success" :disabled="getSport.id == 0">
              <v-icon dark>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn class="mx-1" fab small color="error" :disabled="getSport.id == 0">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" sm="8">
        <v-row></v-row>
      </v-col>
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
      dialogSport: false,
      sportName: "",
    };
  },

  computed: {
    ...mapGetters(["getSports", "getSport"]),
  },

  methods: {
    ...mapActions(["changeSport", "saveSport"]),
    saveSportNew() {
      this.saveSport({ new: true, name: this.sportName });
      this.dialogSport = false;
    },
  },
};
</script>

<style scoped>
</style>