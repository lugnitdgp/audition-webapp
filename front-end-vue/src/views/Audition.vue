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
      <v-app-bar
        class="nav-bar"
        fixed
        style="
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.08);
        "
      >
        <v-app-bar-nav-icon @click="drawer = true" class="app-icon"></v-app-bar-nav-icon>
        <div style="width: 50%; text-align: left">
          <Basetimer :time="time" />
        </div>
        <div style="width: 50%; text-align: right">
          <v-btn @click="logout" color="#B2EBF2">
            <span style="color: #000 !important">Logout</span>
          </v-btn>
        </div>
      </v-app-bar>
    </v-card>
    <v-navigation-drawer fixed v-model="drawer" absolute temporary class="nav-drawer">
      <v-list nav dense>
        <v-tabs v-model="tab" class="quess-box" vertical>
          <v-tab
            class="utab"
            v-for="(question, i) in questions"
            :key="i"
            v-bind:class="classObject(question._id)"
            @click="submitanswer(question._id)"
          >QUES {{ i + 1 }}</v-tab>
        </v-tabs>
      </v-list>
    </v-navigation-drawer>
    <v-container class="question-cont">
      <v-tabs dark show-arrows v-model="tab" class="vtab">
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

        <v-tab
          v-for="(question, i) in questions"
          :key="i"
          v-bind:class="classObject(question._id)"
          @click="submitanswer(question._id)"
          :disabled="disabledTab"
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
      <div class="sbox">
      <div class="submit">
        <v-btn @click="submitround" color="#B2EBF2">
          <span style="color: #000 !important">Save Round</span>
        </v-btn>
      </div>
      </div>
    </v-container>
    <v-snackbar v-model="submitSnackbar" elevation="12" color="success">Round Submitted</v-snackbar>
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
    currentab: null,
    submitSnackbar: false,
    disabledTab: false
  }),

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      console.log("lol");
      common.getstudentRound().then(res => {
        console.log(res.data);
        let t = res.data.time - 2000 - new Date().getTime();
        if (t > 0) {
          this.time = Math.round(t / 1000);
          this.questions = res.data.round.questions;
          this.round = res.data.round.roundNo;
          this.currentab = this.questions[0]._id;
          setTimeout(this.autosubmit, this.time * 1000);
        } else {
          this.$router.push("/");
        }
      });
      common.getAnswers().then(res => {
        console.log(res.data);
        localStorage.setItem("answers", JSON.stringify(res.data.answers));
      });
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      var tok = VueJwtDecode.decode(localStorage.getItem("token").substring(6));
      if (tok.role === "m") {
        this.member = true;
      } else if (tok.role === "su") {
        this.su = true;
      }
    }
  },
  methods: {
    classObject(qid) {
      var a = false;
      if (localStorage.getItem("answers") != null) {
        a = JSON.parse(localStorage.getItem("answers")).find(
          ele => ele.qid === qid
        );
        if (a === undefined) a = false;
        else a = true;
      }
      return {
        done: a
      };
    },
    logout() {
      // eslint-disable-next-line no-unused-vars
      common.logout().then(res => {
        this.$router.push("/login");
      });
    },
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
        this.disabledTab = true
        common.updateAnswer(payload).then(() => {
          this.disabledTab = false;
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
          this.submitSnackbar = true;
        });
      }
    },
    autosubmit() {
      var payload = {
        round: {
          questions: JSON.parse(localStorage.getItem("answers")),
          roundNo: this.round
        }
      };

      common.submitRound(payload).then(() => {
        this.submitSnackbar = true;
        localStorage.removeItem("answers");
        setTimeout(() => {
          this.$router.push("/thanks");
        }, 3000);
      });
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
.v-tabs-bar {
  background-color: rgba(206, 205, 255, 0.075) !important;
  backdrop-filter: blur(8px) !important;
  border-top: 0px solid white !important;
  border-right: 0px solid white !important;
  border-left: 0px solid white !important;
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
}
.nav-drawer {
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(6px);
}
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
  position: relative;
}
.quess {
  margin: 50px auto;
  margin-top: 100px;
  text-align: center;
}
.quess-box {
  overflow: scroll;
  background-color: rgba(206, 205, 255, 0.075);
  backdrop-filter: blur(8px);
  justify-content: center;
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.quess-box::-webkit-scrollbar {
  display: none;
}
.utab {
  min-height: 40px;
  width: 200px !important;
  margin: 5px !important;
  border: 1px solid white !important;
}
.done {
  background-color: rgba(52, 170, 48, 0.247) !important;
}
.vtab {
  background-color: rgba(206, 205, 255, 0.075) !important;
}
#text {
  color: #b2ebf2 !important;
  text-align: center !important;
  font-size: 1.3rem;
  font-weight: 700;
}
.qbody {
  background-color: rgba(206, 205, 255, 0.075);
  backdrop-filter: blur(8px);
  border-right: 1px solid white;
  border-left: 1px solid white;
}
.sbox{
  position: relative;
  width: 100%;
}
.submit {
  position: absolute;
  width: 100%;
  background-color: rgba(206, 205, 255, 0.075);
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

