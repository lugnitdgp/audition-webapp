<template>
  <div>
    <v-container fluid>
      <v-card class="bord" color="#141d2b">
        <v-btn v-if="currentroute === 'Addround' " class="ma-2" outlined fab color="teal">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-if="currentroute === 'Addround' " class="ma-2" outlined fab color="teal">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-card-text class="justify-center" id="text">{{ question.quesText }}</v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-card align-center color="#121a26">
              <v-container fluid>
                <template>
                  <v-container fluid>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        v-for="option in question.options.split(',')"
                        :key="option"
                        :label="option"
                        :value="option"
                        color="#00FFBF"
                      ></v-radio>
                    </v-radio-group>
                  </v-container>
                </template>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Mcq",
  props: ["question"],
  data() {
    return {
      radioGroup: "",
      option: [],
      currentroute: String
    };
  },

  created() {
    this.currentroute = this.$route.name;
    // console.log(this.$route.name);
  }
};
</script>

<style scoped>
#text {
  color: aquamarine !important;
  text-align: center !important;
  font-size: 1rem;
  font-weight: 700;
}
v-img {
  text-align: center !important;
}
</style>
