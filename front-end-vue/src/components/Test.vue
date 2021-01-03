<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title>
            <v-icon large left>mdi-twitter</v-icon>
            <span class="title font-weight-light">Twitter</span>
          </v-card-title>
<v-card-text class="headline font-weight-bold">"hello world."</v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>James Smith</v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">100</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">100</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
	name: "Test",
	// components: {
	// 	VuetifyAudio: () => import("vuetify-audio")
	// },
	data: () => ({
		file: ""
	})
};
</script>

<style scoped>
.bord {
	/* border-left: 5px solid rgb(136, 255, 0) !important;
	box-shadow: -3px 0px 3px 0px rgb(6, 223, 6) !important; */

	background-color: rgba(202, 202, 202, 0.267) !important;
}
.text {
	font-weight: bold;
	font-size: 15px;
}
</style>

