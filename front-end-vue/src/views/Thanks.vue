<template>
<div>
  <span class="bg"></span>
  <div class="wrap">
    <div class="mx-auto tcard">
      <v-img
        src="https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif"
        height="200px"
        style="border-radius: 20px;"
      ></v-img>

      <div class="ttitle">Thanks for attempting</div>
    </div>
  </div>
  </div>
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
    audition: [],
  }),
  name: "Landing",
  beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.audition = res.data;
    });
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      axios.get().then((res) => {
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
  },
};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/img/f.gif") no-repeat center center;
  background-size: cover;
  filter: blur(0px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.7;
}
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tcard {
  width: 90%;
  max-width: 350px;

  backdrop-filter: blur(8px);
  border-radius: 20px;
}
.ttitle {
  text-align: center;

 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 50px;
  text-transform: uppercase;
}
</style>
