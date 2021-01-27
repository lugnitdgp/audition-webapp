<template>
  <div>
    <v-container fluid>
      <v-card class="bord" style="background-color: rgba(0,0,0,0);">
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
        <v-layout>
          <v-flex xs12>
            <v-card align-center style="background-color: rgba(0,0,0,0);">
              <v-container fluid>
                <template>
                  <v-container fluid>
                    <v-radio-group v-if="admin != true" v-model="answer">
                      <v-radio
                        v-for="option in question.options.split(',')"
                        :key="option"
                        :label="option"
                        :value="option"
                        color="#00FFBF"
                      ></v-radio>
                    </v-radio-group>
                    <v-radio-group v-if="admin === true" v-model="studentanswer">
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
  props: ["question", "admin", "studentanswer"],
  data() {
    return {
      option: [],
      currentroute: String,
      answer: "",
    };
  },

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
