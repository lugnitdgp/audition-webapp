<template>
  <v-container>
    <h1>Results for Round {{ audition.round }}</h1>
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="items"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr v-show="row.item.status === 'unevaluated'">
          <td>{{ row.item.name }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar">
      Be patient
    </v-snackbar>
  </v-container>
</template>

<script>
import common from "@/services/common.js";

export default {
  data() {
    return {
      items: [],
      snackbar: false,
      audition: [],
      headers: [
				{ text: "Selected Candidates", align: "start", value: "name" },
			],
    };
  },
  beforeCreate() {
    common.getAuditionStatus().then(res => {
      console.log(res);
       this.audition = res.data;
       if(this.audition.status !== 'res') {
         console.log("lol")
       }
    });
    common.getResult().then(res => {
      console.log(res)
      this.items = res.data;
      console.log(this.items)
    });
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
</style>