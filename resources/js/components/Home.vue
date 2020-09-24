<template>
    <v-container fluid>
        <v-row align="start" justify="start">
            <v-col class="d-flex" cols="12" sm="4">
                <v-row>
                    <v-col class="d-flex" cols="6">
                        <v-select
                            :items="sports"
                            item-value="id"
                            item-text="name"
                            label="Sport"
                            :loading="loading"
                            no-data-text="Choose Sport..."
                            placeholder="Choose Sport..."
                            prepend-inner-icon="mdi-soccer-field"
                            return-object
                            v-model="sport"
                        ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-dialog
                            v-model="dialogSport"
                            persistent
                            max-width="600px"
                        >
                            <v-card>
                                <v-card-title>
                                    <span
                                        class="headline"
                                        v-text="
                                            newSport
                                                ? 'Add New Sport'
                                                : 'Edit This Sport'
                                        "
                                    ></span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Sport*"
                                                    required
                                                    autofocus
                                                    v-model="sportName"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialogSport = false"
                                        >Close</v-btn
                                    >
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="
                                            saveSport({
                                                new: newSport,
                                                name: sportName
                                            });
                                            dialogSport = false;
                                        "
                                        :disabled="sportName == ''"
                                        >Save</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogSportDelete" max-width="290">
                            <v-card>
                                <v-card-title class="headline"
                                    >Delete?</v-card-title
                                >
                                <v-card-text>
                                    Do you agree that the sport
                                    {{ sport.name }} should be deleted?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="success"
                                        @click="
                                            deleteSport();
                                            dialogSportDelete = false;
                                        "
                                        >OK</v-btn
                                    >
                                    <v-btn
                                        color="normal"
                                        @click="dialogSportDelete = false"
                                        >Cancel</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="primary"
                            @click="openSportDialog(true)"
                        >
                            <v-icon dark>mdi-playlist-plus</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="success"
                            :disabled="sport.id == 0"
                            @click="openSportDialog(false)"
                        >
                            <v-icon dark>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="error"
                            :disabled="sport.id == 0"
                            @click="dialogSportDelete = true"
                        >
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-select
                            :items="events.filter(e => e.sport_id == sport.id)"
                            item-value="id"
                            item-text="name"
                            label="Event"
                            :loading="loading"
                            no-data-text="Choose Event..."
                            placeholder="Choose Event..."
                            prepend-inner-icon="mdi-calendar"
                            return-object
                            v-model="event"
                        ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-dialog
                            v-model="dialogEvent"
                            persistent
                            max-width="600px"
                        >
                            <v-card>
                                <v-card-title>
                                    <span
                                        class="headline"
                                        v-text="
                                            newEvent
                                                ? 'Add New Event'
                                                : 'Edit This Event'
                                        "
                                    ></span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Event*"
                                                    required
                                                    autofocus
                                                    v-model="eventName"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="dialogEvent = false"
                                        >Close</v-btn
                                    >
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="
                                            saveEvent({
                                                new: newEvent,
                                                name: eventName
                                            });
                                            dialogEvent = false;
                                        "
                                        :disabled="eventName == ''"
                                        >Save</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogEventDelete" max-width="290">
                            <v-card>
                                <v-card-title class="headline"
                                    >Delete?</v-card-title
                                >
                                <v-card-text>
                                    Do you agree that the event
                                    {{ event.name }} should be deleted?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="success"
                                        @click="
                                            deleteEvent();
                                            dialogEventDelete = false;
                                        "
                                        >OK</v-btn
                                    >
                                    <v-btn
                                        color="normal"
                                        @click="dialogEventDelete = false"
                                        >Cancel</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="primary"
                            @click="openEventDialog(true)"
                            :disabled="sport.id == 0"
                        >
                            <v-icon dark>mdi-playlist-plus</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="success"
                            :disabled="event.id == 0"
                            @click="openEventDialog(false)"
                        >
                            <v-icon dark>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="error"
                            :disabled="event.id == 0"
                            @click="dialogEventDelete = true"
                        >
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-text-field
                            label="Koeficient"
                            type="number"
                            :min="1"
                            :max="9.99"
                            :step="0.01"
                            prepend-inner-icon="mdi-percent-outline"
                            v-model="koeficient"
                        ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="error"
                            @click="koeficient = 1"
                        >
                            <v-icon dark>mdi-autorenew</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-text-field
                            label="Bet"
                            type="number"
                            :min="0.5"
                            :max="20.0"
                            :step="0.5"
                            prepend-inner-icon="mdi-currency-usd"
                            v-model="zalog"
                        ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-btn
                            class="mx-1"
                            fab
                            small
                            color="error"
                            @click="zalog = 0"
                        >
                            <v-icon dark>mdi-autorenew</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-switch
                            class="ma-2"
                            label="Win"
                            v-model="win"
                        ></v-switch>
                    </v-col>
                    <v-col class="d-flex" cols="6">
                        <v-switch
                            class="ma-2"
                            label="Status"
                            v-model="status"
                        ></v-switch>
                    </v-col>
                    <v-col class="d-flex" cols="12">
                        <v-btn
                            color="primary"
                            class="mr-1"
                            :disabled="
                                sport.id == 0 ||
                                    event.id == 0 ||
                                    koeficient <= 1 ||
                                    zalog <= 0
                            "
                        >
                            <v-icon dark>mdi-playlist-plus</v-icon>New
                        </v-btn>
                        <v-btn
                            color="success"
                            class="mr-1"
                            :disabled="
                                newBet ||
                                    sport.id == 0 ||
                                    event.id == 0 ||
                                    koeficient <= 1 ||
                                    zalog <= 0
                            "
                        >
                            <v-icon dark>mdi-pencil-outline</v-icon>Edit
                        </v-btn>
                        <v-btn color="error" class="mr-1" :disabled="newBet">
                            <v-icon dark>mdi-delete</v-icon>Delete
                        </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="12">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="d-flex" cols="12" sm="8">
                <v-row>
                    <v-col class="d-flex" cols="12">
                        <v-data-table
                            style="width:100%;"
                            :headers="headers"
                            :items="
                                bets.map(row => {
                                    const sid = sports.find(
                                        s => s.id == row.sport_id
                                    );
                                    const eid = events.find(
                                        e => e.id == row.event_id
                                    );
                                    if (sid != undefined) {
                                        row.sport_id = sid.name;
                                    }
                                    if (eid != undefined) {
                                        row.event_id = eid.name;
                                    }
                                    return row;
                                })
                            "
                            :items-per-page="5"
                            item-key="id"
                            class="elevation-1"
                            single-select
                            @click:row="rowClick"
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

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
            newBet: true,
            dialogSportDelete: false,
            dialogEventDelete: false
        };
    },

    computed: {
        headers: {
            get() {
                return this.$store.state.headers;
            }
        },
        sports: {
            get() {
                return this.$store.state.sports;
            }
        },
        events: {
            get() {
                return this.$store.state.events;
            }
        },
        bets: {
            get() {
                return this.$store.state.bets;
            }
        },
        sport: {
            get() {
                return this.$store.state.sport;
            },
            set(value) {
                this.$store.commit("setSport", value);
                this.$store.commit("setEvent", {
                    id: 0,
                    sport_id: 0,
                    name: ""
                });
            }
        },
        event: {
            get() {
                return this.$store.state.event;
            },
            set(value) {
                this.$store.commit("setEvent", value);
            }
        },
        koeficient: {
            get() {
                return this.$store.state.koeficient;
            },
            set(value) {
                this.$store.commit("setKoeficient", value);
            }
        },
        zalog: {
            get() {
                return this.$store.state.zalog;
            },
            set(value) {
                this.$store.commit("setZalog", value);
            }
        },
        win: {
            get() {
                if (this.$store.state.win == 0) {
                    return false;
                } else {
                    return true;
                }
            },
            set(value) {
                if (value) {
                    this.$store.commit("setWin", 1);
                } else {
                    this.$store.commit("setWin", 0);
                }
            }
        },
        status: {
            get() {
                if (this.$store.state.status == 0) {
                    return false;
                } else {
                    return true;
                }
            },
            set(value) {
                if (value) {
                    this.$store.commit("setStatus", 1);
                } else {
                    this.$store.commit("setStatus", 0);
                }
            }
        }
    },

    methods: {
        ...mapActions(["saveSport", "saveEvent", "deleteSport", "deleteEvent"]),
        openSportDialog(isNew) {
            if (isNew) {
                this.sportName = "";
            } else {
                this.sportName = this.sport.name;
            }
            this.newSport = isNew;
            this.dialogSport = true;
        },
        openEventDialog(isNew) {
            if (isNew) {
                this.eventName = "";
            } else {
                this.eventName = this.event.name;
            }
            this.newEvent = isNew;
            this.dialogEvent = true;
        },
        rowClick(item, row) {
            row.select(true);
            console.log(item);
        }
    }
};
</script>

<style>
tr.v-data-table__selected {
    background: #7d92f5 !important;
}
</style>
