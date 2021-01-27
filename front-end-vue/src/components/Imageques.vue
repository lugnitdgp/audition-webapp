<template>
  <v-container fluid>
    <v-card class="bord" color="#141d2b">
      <v-btn
        v-if="currentroute === 'Addround'"
        class="ma-2"
        outlined
        fab
        color="teal"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        v-if="currentroute === 'Addround'"
        class="ma-2"
        outlined
        fab
        color="teal"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-card-text class="justify-center" id="text">{{
        question.quesText
      }}</v-card-text>
      <v-layout class="justify-center">
        <v-flex xs12 sm6 lg3>
          <v-card align-center>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-img width="300" heiht="300" :src="question.quesLink"></v-img>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-spacer />
    <v-spacer />
    <v-textarea
      v-model="answer"
      filled
      name="input-7-4"
      label="Answers"
      auto-grow
      color="#00FFBF"
      class="text"
    ></v-textarea>
    <v-file-input
        v-model="file"
        show-size
        accept="image/png, image/jpeg, image/bmp, .zip"
        color="success"
        placeholder="Pick an image"
        prepend-icon="mdi-camera"
        label="Image"
        filled
      />
  </v-container>
</template>

<script>
export default {
  name: "Imageques",
  props: ["question", "admin", "studentanswer"],
  data: () => ({
    currentroute: String,
    answer: "",
    file: ""
  }),

  created() {
    this.currentroute = this.$route.name;
    console.log(localStorage.getItem("answers"));
    if (localStorage.getItem("answers") != null) {
      var answers = JSON.parse(localStorage.getItem("answers"));
      answers.forEach((answer) => {
        if (answer.qid === this.question._id) {
          this.answer = answer.answer;
        }
      });
    }
  },

  watch: {
    answer: {
      handler() {
        console.log(this.answer);
        if (localStorage.getItem("answers") === null) {
          var newanswer = {
            answer: this.answer,
            qid: this.question._id,
            qtype: this.question.quesType,
          };
          var ans = [];
          ans.push(newanswer);
          localStorage.setItem("answers", JSON.stringify(ans));
        } else {
          var answers = JSON.parse(localStorage.getItem("answers"));
          var foundanswer = false;
          answers.forEach((answer) => {
            if (answer.qid === this.question._id) {
              answer.answer = this.answer;
              foundanswer = true;
            }
          });
          if (foundanswer === false) {
            var newans = {
              answer: this.answer,
              qid: this.question._id,
              qtype: this.question.quesType,
            };
            answers.push(newans);
          }

          localStorage.setItem("answers", JSON.stringify(answers));
        }
      },
      deep: true,
    },
  },
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