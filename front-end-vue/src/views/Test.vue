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
        <v-app-bar-nav-icon @click="drawer = true" class="app-icon"></v-app-bar-nav-icon>
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary class="nav-drawer">
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--lighten-2">
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
        >QUES {{ i + 1 }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(question, i) in questions" :key="i">
          <v-container>
            <Normalques :question="question" v-if="question[`quesType`] === 'nor'" />
            <Imageques :question="question" v-if="question[`quesType`] === 'img'" />
            <Mcq :question="question" v-if="question[`quesType`] === 'mcq'" />
            <Audio :question="question" v-if="question[`quesType`] === 'aud'" />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Audio from "../components/Audio";
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
import Imageques from "../components/Imageques";
import Normalques from "../components/Normalques";
import Mcq from "../components/Mcq";

export default {
  name: "Test",
  components: {
    Imageques,
    Normalques,
    Mcq,
    Audio
  },
  data: () => ({
    questions: [],
    tab: null,
    drawer: false,
    group: null,
  }),

  beforeCreate() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      this.questions = [
          { 
            _id: 1,
            quesText: 'Lorem Ipsum is simply dummy text of',
            quesLink: 'https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif',
            quesType: 'img',
            options: '1,2,3,4' 
          },
          {
            _id: 2, 
            quesText: 'Lorem Ipsum is simply dummy text of',
            quesLink: 'https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif',
            quesType: 'nor',
            options: '1,2,3,4' 
          },
          { 
            _id: 3,
            quesText: 'Lorem Ipsum is simply dummy text of',
            quesLink: 'https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif',
            quesType: 'mcq',
            options: '1,2,3,4' 
          },
          {
            _id: 4, 
            quesText: 'Lorem Ipsum is simply dummy text of',
            quesLink: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
            quesType: 'aud',
            options: '1,2,3,4' 
          },
        ]   
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
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop - 100;

      window.scrollTo(0, top);
    },
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

