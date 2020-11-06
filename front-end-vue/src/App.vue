<template>
<v-app>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</v-app>
</template>

<script>
import Footer from './components/layout/Footer';

export default {
  
  name:"app",
  components: {
    Footer
  },
  created(){
    this.$vuetify.theme.dark = true
  }
}
</script>