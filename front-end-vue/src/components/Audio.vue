<template>
  <div>
    <v-container fluid>
     <div class="bord" style="background-color: rgba(0,0,0,0); width: 95%; max-width:700px; margin: 0 auto;">
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
          <v-flex xs12 sm12 lg12>
            <div align-center>
              <v-container fluid>
                <vuetify-audio
                  :file="question.quesLink"
                  :ended="audioFinish"
                  style="background-color: rgba(0,0,0,0); width: 96%; max-width:700px; margin: 0 auto; border-radius: 20px;"
                ></vuetify-audio>
              </v-container>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <div class="bord" style="background-color: rgba(0,0,0,0); width: 96%; max-width:700px; margin: 0 auto;">
      <textarea
        v-model="answer"
        filled
        v-if="admin != true"
        name="input-7-4"
        label="Answers"
        placeholder="Answers"
        auto-grow
        color="#00FFBF"
        class="text"
      ></textarea>
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
      <v-file-input
        v-model="studentfile"
        v-if="admin != true"
        show-size
        accept="image/png, image/jpeg, image/bmp, .zip"
        color="success"
        placeholder="Pick an image"
        prepend-icon="mdi-camera"
        label="Image"
        filled
      />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Audio",
  props: ["question", "admin", "studentanswer"],

  components: {
    VuetifyAudio: () => import("vuetify-audio"),
  },
  data: () => ({
    file: "",
    currentroute: String,
    answer: "",
    studentfile: ""
  }),
  created() {
    this.currentroute = this.$route.name;
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
.text {
  resize: none;
  outline: none;
  height: 150px;
  border-radius: 20px;
  width: 100%;
  border: 1px solid white;
  color: #fff !important;
  text-align: center !important;
  font-size: 18px;
  font-weight: 400;
}
v-img {
  text-align: center !important;
}
</style>
