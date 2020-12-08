<template>
  <v-app id="inspire">
     <Sidenav />
     <Audio />
     <Normalques />
     <Imageques />
     <Mcq />
   </v-app>
</template>

<script>
import Audio from "../components/Audio";
import Normalques from "../components/Normalques";
import Imageques from "../components/Imageques";
import Mcq from "../components/Mcq";
import Sidenav from "../components/layout/Sidenav";
export default {
    components: {
    Sidenav,
    Audio,
    Normalques,
    Imageques,
    Mcq
	},
}
</script>