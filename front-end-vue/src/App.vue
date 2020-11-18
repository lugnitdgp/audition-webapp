<template>
<v-app>
  <div id="app">
    <router-view/>
   
  </div>
</v-app>
</template>

<script>


export default {
  
  name:"app",
 
  created(){
    this.$vuetify.theme.dark = true
  }
}
</script>

<style scoped>
#app{
 height: 100vh;
 
}
</style>