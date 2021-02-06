<template>
  <v-app>
    <Sidenav />
    <v-container>
      <h1 class="glitch" style="text-align: center;">RoundS</h1>
      <div>
        <v-expansion-panels v-model="panel">
          <v-expansion-panel v-for="(item,i) in  rounds" :key="i">
            <v-expansion-panel-header @click="datapopulate(item)">ROUND {{item.roundNo}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container fluid>
                <v-card class="bord">
                  <v-text-field v-model="time" label="round time" outlined color="error"></v-text-field>
                  <v-skeleton-loader
                    class="mx-auto"
                    v-if="loading === true"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                  <v-card v-if="loading === false">
                    <v-textarea
                      v-model="quesText"
                      label="Question text"
                      color="success"
                      outlined
                      auto-grow
                    ></v-textarea>

                    <v-select
                      :items="items"
                      v-model="quesType"
                      label="Question type"
                      outlined
                      color="success"
                    ></v-select>
                    <v-file-input
                      :rules="rules"
                      v-model="file"
                      v-if="quesType === 'img'"
                      show-size
                      accept="image/png, image/jpeg, image/bmp"
                      color="success"
                      placeholder="Pick an image"
                      prepend-icon="mdi-camera"
                      label="Image"
                      filled
                    />
                    <v-file-input
                      :rules="rules"
                      v-model="file"
                      v-if="quesType === 'aud'"
                      show-size
                      color="deep-purple accent-4"
                      accept="audio/ogg, audio/mp3, audio/aac audio/wav"
                      placeholder="Pick a audio"
                      prepend-icon="mdi-music"
                      label="Sound"
                      filled
                    />
                    <v-text-field v-model="options" v-if="quesType === 'mcq'" label="Options" solo></v-text-field>
                    <v-spacer />

                    <v-spacer />
                    <v-btn color="blue-grey" class="ma-2 white--text" @click="uploadForm">
                      Media
                      <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>

                    <v-spacer />
                    <v-spacer />
                    <v-btn
                      color="blue-grey"
                      :disabled="quesText === ''"
                      class="ma-2 white--text"
                      @click="addQues"
                    >
                      Question
                      <v-icon right dark>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      :loading="loading1"
                      :disabled="loading1"
                      color="blue-grey"
                      class="ma-2 white--text"
                      @click="saveRound(item)"
                    >
                      Save Round
                      <v-icon right dark>mdi-plus</v-icon>
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-card>
                  <v-snackbar v-model="snackbar">The round has been succesfully pushed.</v-snackbar>
                  <v-spacer />
                  <v-spacer />
                  <v-spacer />
                  <br />

                  <v-container v-for="(question, index) in questions" :key="index">
                    <v-card>
                      <v-btn @click="deleteques(index)" class="ma-2" outlined fab color="teal">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <Normalques
                        :question="question"
                        :admin="true"
                        v-if="question[`quesType`] === 'nor'"
                      />
                      <Imageques
                        :question="question"
                        :admin="true"
                        v-if="question[`quesType`] === 'img'"
                      />
                      <Mcq
                        :question="question"
                        :admin="true"
                        v-if="question[`quesType`] === 'mcq'"
                      />
                      <Audio
                        :question="question"
                        :admin="true"
                        v-if="question[`quesType`] === 'aud'"
                      />
                    </v-card>
                  </v-container>
                </v-card>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <v-snackbar v-model="snackbar">Be patient</v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import common from "@/services/common.js";
import Audio from "../components/Audio";
import Normalques from "../components/Normalques";
import Imageques from "../components/Imageques";
import Mcq from "../components/Mcq";
import Sidenav from "../components/layout/Sidenav";

export default {
  components: {
    Audio,
    Normalques,
    Imageques,
    Mcq,
    Sidenav
  },
  data() {
    return {
      rounds: [],
      snackbar: false,
      audition: [],
      headers: [{ text: "Selected Candidates", align: "start", value: "name" }],
      quesText: "",
      quesLink: "",
      questions: [],
      loading: false,
      loading1: false,
      file: "",
      adminUser: "",
      score: 0,
      items: ["mcq", "img", "aud", "nor"],
      quesType: "",
      options: "",
      time: null,
      panel: null,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ]
    };
  },
  beforeCreate() {
    common.getRounds().then(res => {
      console.log(res);
      this.rounds = res.data;
      console.log(this.items);
    });
  },

  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    datapopulate(round) {
      this.time = round.time;
      this.questions = round.questions;
      if (this.panel != undefined) {
        this.questions = null;
      }
    },
    addQues() {
      if (this.quesText !== "") {
        this.questions.push({
          quesText: this.quesText,
          score: this.score,
          quesLink: this.quesLink,
          quesType: this.quesType,
          options: this.options
        });
        this.quesText = "";
        this.quesLink = "";
        this.quesType = "";
        this.options = "";
      }
    },
    deleteques(index) {
      this.questions.splice(index, 1);
      console.log(this.questions);
    },
    async uploadForm() {
      this.loading = true;
      const formdata = new FormData();
      formdata.append("file", this.file, this.file.name);
      await common.upload(formdata).then(res => {
        console.log(res.data);
        this.quesLink = res.data.link;
        this.loading = false;
      });
    },
    saveRound(round) {
      round.time = this.time;
      console.log(round);
      var payload = {
        round: round
      };
      common.updateRound(payload).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
.table-wrap {
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  margin: 0 auto;
  overflow-y: scroll;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.trowhead {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff !important;
  width: 100%;
  opacity: 1 !important;
  background-color: rgba(0, 2, 37, 0.787);
  backdrop-filter: blur(3px);
  border: 0px solid #fff;
  padding: 5px;
  text-transform: uppercase;
  font-weight: 600;
}
.trow {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff !important;
  width: 100%;
  opacity: 1 !important;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  border: 0px solid #fff;
  padding: 10px;
}
.glitch {
  font-size: 2.3rem;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 9px;
  font-family: "Bebas Neue", cursive;
  text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(37, 37, 39, 0.75);
  animation: glitch 500ms infinite;
}
@media only screen and (max-width: 700px) {
  .glitch {
    font-size: 2.1rem;
  }
  .login-box {
    padding: 10px 20px;
  }
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}
</style>
