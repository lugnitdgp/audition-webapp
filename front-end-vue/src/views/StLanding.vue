<template>
  <div id="app">
    <span class="bg"></span>
    <v-app id="inspire">
      <v-content>
        <Sidenav />
            <v-btn @click="logout" color="#FF1744">Logout</v-btn>
            <Normalques />
            <Normalques />
            <Normalques />
            <Normalques />
      </v-content>
    </v-app>
  </div>
</template>



<script>
import common from "@/services/common.js";
import Normalques from "../components/Normalques";
import Sidenav from "../components/layout/Sidenav";
import axios from "axios";
export default {
	components: {
        Sidenav,
        Normalques,
	},
	name: "Landing",
	beforeCreate() {
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
	},
	methods: {
		logout() {
			common.logout().then(res => {
				alert(res.data);
				this.$router.push("/StLog");
			});
		}
	}
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/img/bg.mp4") no-repeat center center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
}
</style>
