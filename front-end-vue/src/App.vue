<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
    <Footer />
  </v-app>
</template>

<script>
 import Footer from "./components/layout/Footer";

export default {
  name: "app",
  components: {
     Footer,
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style scoped>
#app {
  
}
</style>