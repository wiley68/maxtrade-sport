<template>
    <v-container fluid>
        <v-card class="mx-auto text-center" color="green" dark>
            <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                        color="rgba(255, 255, 255, .7)"
                        line-width="1"
                        height="100"
                        padding="4"
                        stroke-linecap="round"
                        smooth="10"
                        :value="bets"
                        auto-draw
                        auto-line-width
                        label-size="3"
                    >
                        <template v-slot:label="item">
                            {{
                                Math.ceil(item.value) % 10 == 0
                                    ? Math.ceil(item.value)
                                    : ""
                            }}
                        </template>
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

    computed: {
        bets: {
            get() {
                const chartBets = this.$store.state.bets.map(b => ({
                    win:
                        b.status == 1 ? (b.win == 1 ? b.winprice : -b.zalog) : 0
                }));
                const chartBetsValues = chartBets.map(function(obj) {
                    return parseFloat(obj.win);
                });
                const reducedBets = chartBetsValues.map((elem, index) =>
                    chartBetsValues.slice(0, index + 1).reduce((a, b) => a + b)
                );
                return reducedBets;
            }
        }
    }
};
</script>

<style></style>
