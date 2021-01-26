<template>
  <div>
    <v-container fluid>
      <v-card class="bord" color="#141d2b">
        <v-btn @click="deleteques" v-if="currentroute === 'Addround' " class="ma-2" outlined fab color="teal">
          <v-icon >mdi-delete</v-icon>
        </v-btn>
		<v-btn v-if="currentroute === 'Addround' " class="ma-2" outlined fab color="teal">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-card-text class="justify-center" id="text">{{ question.quesText }}</v-card-text>
      </v-card>
      <v-spacer />
      <v-spacer />
      <v-textarea filled name="input-7-4" label="Answers" auto-grow color="#00FFBF" class="text"></v-textarea>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Normalques",
  props: ["question"],
   data: () => ({
    currentroute: String,
    test : [],
    

  }),

  created() {
	this.currentroute = this.$route.name; 
    // console.log(this.$route.name);
  },
  methods : {
    deleteques() {
      console.log(this.$props.question)
      this.test = localStorage.getItem("questions")
       console.log(this.test)
      this.test = this.test.filter((question) => question.quesType !== this.$props.question.quesType)

      // this.test.forEach((question, index) => {
      //   if(question.quesType === this.$props.question.quesType){
      //     this.test.splice(index, 1);
      //     localStorage.setItem("questions", this.test);
          
      //   }
      
      // });
      console.log(this.test)
      
    }
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
</style>
