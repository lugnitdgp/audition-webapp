<template>
<v-card>
<v-footer
      :padless= true    >
      <v-card
        flat
        tile
        width="100%"
      >

        <v-divider></v-divider>

        <v-card-text  class="white--text">
          {{ new Date().getFullYear() }}  <strong>GNU/Linux User's Group, NIT Durgapur</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    
        </v-card>
    </template>

    <script>
export default {
  name: "Footer"
}
</script>
