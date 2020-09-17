<template>
  <v-container fluid>
    <v-row align="start" justify="start">
      <v-col class="d-flex" cols="12" sm="4">
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="items"
              item-value="id"
              item-text="name"
              label="Sport"
              :loading="loading"
              no-data-text="Choose Sport..."
              placeholder="Choose Sport..."
              prepend-inner-icon="mdi-soccer-field"
              return-object
              :value="item"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6"></v-col>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" sm="8"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      items: [
        { id: "1", name: "Foo1" },
        { id: "2", name: "Foo2" },
        { id: "3", name: "Foo3" },
        { id: "4", name: "Foo4" },
      ],
      item: { id: "0", name: "" },
      loading: false,
    };
  },
};
</script>

<style scoped>
</style>