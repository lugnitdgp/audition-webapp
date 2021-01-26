<template>
  <div>
    <v-container fluid>
      <v-card class="bord" color="#141d2b">
        <v-btn
          @click="deleteques"
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
      </v-card>
      <v-spacer />
      <v-spacer />
      <v-textarea
        v-model="answer"
        filled
        v-if="admin != true"
        name="input-7-4"
        label="Answers"
        auto-grow
        color="#00FFBF"
        class="text"
      ></v-textarea>
      <v-textarea
        v-model="studentanswer"
        filled
        disabled
        v-if="admin === true"
        name="input-7-4"
        label="Answers"
        auto-grow
        color="#00FFBF"
        class="text"
      ></v-textarea>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Normalques",
  props: ["question", "admin", "studentanswer"],
  data: () => ({
    currentroute: String,
    test: [],
    answer: "",
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
  // methods: {
  //   deleteques() {
  //     console.log(this.$props.question);
  //     this.test = localStorage.getItem("questions");
  //     console.log(this.test);
  //     this.test = this.test.filter(
  //       question => question.quesType !== this.$props.question.quesType
  //     );

  //     this.test.forEach((question, index) => {
  //       if(question.quesType === this.$props.question.quesType){
  //         this.test.splice(index, 1);
  //         localStorage.setItem("questions", this.test);

  //       }

  //     });
  //     console.log(this.test);
  //   }
  // },

  watch: {
    answer: {
      handler() {
        console.log(this.answer);
        if (localStorage.getItem("answers") === null && (this.admin === null || this.admin === undefined)) {
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
</style>