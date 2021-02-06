<template>
  <div>
    <v-card class="mx-auto overflow-hidden" color="rgb(0, 0, 0, 0.2)">
      <v-app-bar class="elevation-0" id="nav-bar">
        <v-app-bar-nav-icon @click="drawer = true" class="app-icon"></v-app-bar-nav-icon>
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary class="nav-drawer">
      <v-list nav dense v-if="!su && !member">
        <v-list-item-group active-class="deep-purple--text text--lighten-2">
          <router-link tag="span" to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/register">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/login">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
      <v-list nav dense v-if="!su || !member">
        <v-list-item-group active-class="deep-purple--text text--lighten-2">
          <router-link tag="span" to="/event">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/root" v-if="su">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-gavel</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Root</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/addround">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Add Round</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/edit">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Edit Round</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link tag="span" to="/admin">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </router-link>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import common from "@/services/common.js";

export default {
  name: "Sidenav",
  data: () => ({
    drawer: false,
    var1: "red darken-4",
    member: false,
    su: false
  }),
  created() {
    var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
    if (tok.role === "m") {
      this.member = true;
    } else if (tok.role === "su") {
      this.su = true;
    }
  },
  methods : {
    logout() {
      // eslint-disable-next-line no-unused-vars
      common.logout().then(res => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.v-list-item {
  cursor: pointer !important;
}
.nav-drawer {
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(6px);
}

#nav-bar {
  background-color: transparent;
  border: none;
  color: white;
}
</style>