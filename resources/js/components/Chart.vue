<template>
  <v-container fluid>
    <v-card class="mx-auto text-center" color="green" dark>
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            color="rgba(255, 255, 255, .7)"
            line-width="2"
            height="100"
            padding="4"
            stroke-linecap="round"
            smooth="10"
            :value="value"
            auto-draw
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
      <v-card-text>
        <div class="display-1 font-weight-thin">Bets result</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Chart",

  data() {
    return {
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    };
  },

  computed: {
    bets: {
      get() {
        return this.$store.state.bets;
      },
    },
  },
};
</script>

<style></style>
