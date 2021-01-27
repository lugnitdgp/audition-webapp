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

        <Basetimer :time="time" />
        <v-btn @click="logout" color="#B2EBF2">
            <span style="color: #000 !important">Logout</span>
          </v-btn>
      </v-app-bar>
    </v-card>

    <v-container class="question-cont">
      <v-tabs dark show-arrows v-model="tab" class="vtab">
        <v-tabs-slider color="teal lighten-3" ></v-tabs-slider>

        <v-tab
          v-for="(question, i) in questions"
          :key="i"
          @click="submitanswer(question._id)"
        >QUES {{ i + 1 }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="qbody">
        <v-tab-item v-for="(question, i) in questions" :key="i">
          <v-container>
            <Normalques :question="question" v-if="question[`quesType`] === 'nor'" />
            <Imageques :question="question" v-if="question[`quesType`] === 'img'" />
            <Mcq :question="question" v-if="question[`quesType`] === 'mcq'" />
            <Audio :question="question" v-if="question[`quesType`] === 'aud'" />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
      <div class="submit"> 
      <v-btn @click="submitround" color="#B2EBF2">
        <span style="color: #000 !important">Save Round</span>
      </v-btn>
      </div>
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
    Audio
  },
  data: () => ({
    file: "",
    drawer: false,
    group: null,
    member: false,
    su: false,
    questions: [],
    time: null,
    round: null,
    tab: null,
    currentab: null
  }),

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      common.getstudentRound().then(res => {
        console.log(res.data);
        let t = res.data.time - 2000 - new Date().getTime();
        if (t > 0) {
          this.time = Math.round(t / 1000);
          this.questions = res.data.round.questions;
          this.round = res.data.round.roundNo;
          this.currentab = this.questions[0]._id;
          console.log(this.questions);
          setTimeout(this.submitround, this.time * 1000);
        } else {
          this.$router.push("/");
        }
      });
    }
  },

  created() {
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
      common.logout().then(res => {
        alert(res.data);
        this.$router.push("/StLog");
      });
    },
    // goto(refName) {
    //   var element = this.$refs[refName];
    //   var top = element.offsetTop - 100;

    //   window.scrollTo(0, top);
    // },
    submitanswer(qid) {
      var searchel = JSON.parse(localStorage.getItem("answers")).find(
        answer => answer.qid === this.currentab
      );
      if (searchel !== undefined) {
        var payload = {
          qid: this.currentab,
          answer: searchel.answer,
          round: this.round,
          qtype: searchel.qtype
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
        // alert("Try. ._. :/ ???");
      } else {
        var payload = {
          round: {
            questions: JSON.parse(localStorage.getItem("answers")),
            roundNo: this.round
          }
        };

        common.submitRound(payload).then(() => {
          alert("Round Submitted");
          this.$router.push("/Thanks");
        });
      }
    }
  },
  watch: {
    darkmode(newvalue) {
      this.$vuetify.theme.dark = newvalue;
    },
    group() {
      this.drawer = false;
    }
  }
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
  margin-top: 100px;
  text-align: center;
}

.vtab{
background-color: rgba(206, 205, 255, 0.075) !important;
}
#text {
  color: #b2ebf2 !important;
  text-align: center !important;
  font-size: 1.3rem;
  font-weight: 700;
}
.qbody{
  background-color: rgba(206, 205, 255, 0.075);
  backdrop-filter: blur(8px);
  border-right: 1px solid white;
  border-left: 1px solid white;
}
.submit{
  width: 100%;
   background-color:  rgba(206, 205, 255, 0.075);
  backdrop-filter: blur(8px);
  border-right: 1px solid white;
  border-left: 1px solid white;
  border-bottom: 10px solid white;
  padding-bottom: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
v-img {
  text-align: center !important;
}

</style>

