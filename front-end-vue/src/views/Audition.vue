<template>
  <div>
    <video
      src="https://video.wixstatic.com/video/b0567a_9aed8193b5b742d5ac48c51a8e5f9f4e/1080p/mp4/file.mp4"
      autoplay
      loop
      playsinline
      muted
    ></video>
    <v-card class="mx-auto overflow-hidden nav-bar">
      <v-app-bar class="nav-bar" fixed>
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="app-icon"
        ></v-app-bar-nav-icon>
        <Basetimer :time="time" />
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary class="nav-drawer">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--lighten-2"
        >
          <v-btn @click="logout" color="#B2EBF2">
            <span style="color: #000 !important">Logout</span>
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container class="question-cont">
      <v-tabs dark show-arrows v-model="tab">
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

        <v-tab
          style="background-color: green !important"
          v-for="(question, i) in questions"
          :key="i"
          @click="submitanswer(question._id)"
          >QUES {{ i + 1 }}</v-tab
        >
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(question, i) in questions" :key="i">
          <v-container>
            <Normalques
              :question="question"
              v-if="question[`quesType`] === 'nor'"
            />
            <Imageques
              :question="question"
              v-if="question[`quesType`] === 'img'"
            />
            <Mcq :question="question" v-if="question[`quesType`] === 'mcq'" />
            <Audio :question="question" v-if="question[`quesType`] === 'aud'" />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
      <v-btn @click="submitround" color="#B2EBF2">
        <span style="color: #000 !important">Submit Round</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Audio from "../components/Audio";
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
import Basetimer from "../components/Basetimer";
import Imageques from "../components/Imageques";
import Normalques from "../components/Normalques";
import Mcq from "../components/Mcq";

export default {
  name: "Audition",
  components: {
    Basetimer,
    Imageques,
    Normalques,
    Mcq,
  },
  data: () => ({
    file: "",
    drawer: false,
    group: null,
    member: false,
    su: false,
    questions: [],
    time: null,
    imgques: [],
    norques: [],
    mcqques: [],
    answers: [],
    round: null,
    tab: null,
    currentab: null,
  }),

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      common.getstudentRound().then((res) => {
        console.log(res.data);
        this.time = Math.round(
          (res.data.time - 2000 - new Date().getTime()) / 1000
        );
       
        this.questions = res.data.round.questions;
        this.round = res.data.round.roundNo;
        this.currentab = this.questions[0]._id;
        console.log(this.questions);
        this.questions.forEach((question) => {
          this.categorized(question);
        });
      });
    }
  },

  created() {
     setTimeout(this.submitround, this.time*1000);
    this.$vuetify.theme.dark = true;
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
      console.log(tok);
      if (tok.role === "m") {
        this.member = true;
      } else if (tok.role === "su") {
        this.su = true;
      }
    }
  },
  methods: {
    logout() {
      common.logout().then((res) => {
        alert(res.data);
        this.$router.push("/StLog");
      });
    },
    categorized(question) {
      if (question.quesType === "img") {
        this.imgques.push(question);
      } else if (question.quesType === "nor") {
        this.norques.push(question);
        console.log(this.norques);
      } else if (question.quesType === "mcq") {
        this.mcqques.push(question);
      }
    },
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop - 100;

      window.scrollTo(0, top);
    },
    submitanswer(qid) {
      var searchel = JSON.parse(localStorage.getItem("answers")).find(
        (answer) => answer.qid === this.currentab
      );
      if (searchel !== undefined) {
        var payload = {
          qid: this.currentab,
          answer: searchel.answer,
          round: this.round,
          qtype: searchel.qtype,
        };
        common.updateAnswer(payload).then(() => {
          this.currentab = qid;
        });
      } else {
        this.currentab = qid;
      }
    },
    submitround() {
      if (localStorage.getItem("answers") === null) {
        alert("Try. ._. :/ ???");
      } else {
        var payload={round : {
          questions: JSON.parse(localStorage.getItem("answers")),
          roundNo: this.round
          }}

          common.submitRound(payload).then(()=>{
            alert("Round Submitted")
          })
      }
    },
  },
  watch: {
    darkmode(newvalue) {
      this.$vuetify.theme.dark = newvalue;
    },
    group() {
      this.drawer = false;
    },
  },
};
</script>


<style scoped>
video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.nav-bar {
  background-color: transparent !important;
  background: transparent !important;
  border: none;
  color: white;
}
.question-cont {
  margin-top: 11rem;
  margin-bottom: 11rem;
}
#text {
  color: #b2ebf2 !important;
  text-align: center !important;
  font-size: 1.3rem;
  font-weight: 700;
}
v-img {
  text-align: center !important;
}
@media only screen and (max-width: 1264px) and (min-width: 992px) {
  #text {
    font-size: 1.1rem;
  }
  .question-cont {
    margin-bottom: 8rem;
  }
}
@media only screen and (max-width: 992px) and (min-width: 764px) {
  #text {
    font-size: 1.1rem;
  }
  .question-cont {
    margin-bottom: 8rem;
  }
}
@media only screen and (max-width: 764px) and (min-width: 576px) {
  #text {
    font-size: 1rem;
  }
  .question-cont {
    margin-top: 9rem;
    margin-bottom: 8rem;
  }
}
@media only screen and (max-width: 576px) {
  #text {
    font-size: 0.9rem;
  }
  .question-cont {
    height: 100vh;
    margin-top: 3rem;
  }
}
</style>

