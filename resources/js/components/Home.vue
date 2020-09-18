<template>
  <v-container fluid>
    <v-row align="start" justify="start">
      <v-col class="d-flex" cols="12" sm="4">
        <v-row>
          <v-col class="d-flex" cols="6">
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
          <v-col class="d-flex" cols="6">
            <v-dialog v-model="dialogSport" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline" v-text="newSport ? 'Add New Sport' : 'Edit This Sport'"></span>
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
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveSport({ new: newSport, name: sportName }); dialogSport = false"
                    :disabled="sportName == ''"
                  >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogSportDelete" max-width="290">
              <v-card>
                <v-card-title class="headline">Delete?</v-card-title>
                <v-card-text>Do you agree that the sport {{getSport.name}} should be deleted?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="deleteSport(); dialogSportDelete = false">OK</v-btn>
                  <v-btn color="normal" @click="dialogSportDelete = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn class="mx-1" fab small color="primary" @click="openSportDialog(true)">
              <v-icon dark>mdi-playlist-plus</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              fab
              small
              color="success"
              :disabled="getSport.id == 0"
              @click="openSportDialog(false)"
            >
              <v-icon dark>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              fab
              small
              color="error"
              :disabled="getSport.id == 0"
              @click="dialogSportDelete = true"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-select
              :items="getEvents"
              item-value="id"
              item-text="name"
              label="Event"
              :loading="loading"
              no-data-text="Choose Event..."
              placeholder="Choose Event..."
              prepend-inner-icon="mdi-calendar"
              return-object
              :value="getEvent"
              @change="changeEvent"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-dialog v-model="dialogEvent" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline" v-text="newEvent ? 'Add New Event' : 'Edit This Event'"></span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Event*" required autofocus v-model="eventName"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogEvent = false">Close</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveSport({ new: newEvent, name: eventName }); dialogEvent = false"
                    :disabled="eventName == ''"
                  >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogEventDelete" max-width="290">
              <v-card>
                <v-card-title class="headline">Delete?</v-card-title>
                <v-card-text>Do you agree that the event {{getEvent.name}} should be deleted?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="deleteEvent(); dialogEventDelete = false">OK</v-btn>
                  <v-btn color="normal" @click="dialogEventDelete = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn class="mx-1" fab small color="primary" @click="openEventDialog(true)">
              <v-icon dark>mdi-playlist-plus</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              fab
              small
              color="success"
              :disabled="getEvent.id == 0"
              @click="openEventDialog(false)"
            >
              <v-icon dark>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              fab
              small
              color="error"
              :disabled="getEvent.id == 0"
              @click="dialogEventDelete = true"
            >
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
      dialogEvent: false,
      sportName: "",
      eventName: "",
      newSport: true,
      newEvent: true,
      dialogSportDelete: false,
      dialogEventDelete: false,
    };
  },

  computed: {
    ...mapGetters(["getSports", "getEvents", "getSport", "getEvent"]),
  },

  methods: {
    ...mapActions([
      "changeSport",
      "changeEvent",
      "saveSport",
      "saveEvent",
      "deleteSport",
      "deleteEvent",
    ]),
    openSportDialog(isNew) {
      this.sportName = this.getSport.name;
      this.newSport = isNew;
      this.dialogSport = true;
    },
    openEventDialog(isNew) {
      this.eventName = this.getEvent.name;
      this.newEvent = isNew;
      this.dialogEvent = true;
    },
  },
};
</script>

<style scoped>
</style>