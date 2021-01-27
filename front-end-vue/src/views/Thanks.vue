<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-img src="https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif" height="200px"></v-img>

      <v-card-title>Thanks for attempting</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import common from "@/services/common.js";
// import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
export default {
  components: {},
  data: () => ({
    member: false,
    su: false,
    audition: []
  }),
  name: "Landing",
  beforeCreate() {
    common.getAuditionStatus().then(res => {
      console.log(res);
      this.audition = res.data;
    });
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      axios.get().then(res => {
        console.log(res.data);
        if (res.data.isAdmin === false) {
          console.log(res.data);
        } else {
          alert("You are the Admin. Accessing wrong route, re-routing");
          this.$router.push("/AdLog");
        }
      });
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
</style>