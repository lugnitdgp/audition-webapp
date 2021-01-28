<template>
  <v-app id="inspire">
    <span class="bg"></span>
    <Sidenav />
    <v-content>
      <v-container fluid>
        <v-card class="bord">
          <v-container>
            <v-text-field
            v-model="time"
            label="round time"
            outlined
            color="error"
            
          ></v-text-field>
            <v-skeleton-loader class="mx-auto" v-if="loading === true" max-width="300" type="card"></v-skeleton-loader>
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
                @click="addRound"
              >
                Add Round
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
                <v-btn
                  @click="deleteques(index)"
                  class="ma-2"
                  outlined
                  fab
                  color="teal"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              <Normalques :question="question" :admin="true" v-if="question[`quesType`] === 'nor'" />
              <Imageques :question="question" :admin="true" v-if="question[`quesType`] === 'img'" />
              <Mcq :question="question" :admin="true" v-if="question[`quesType`] === 'mcq'" />
              <Audio :question="question" :admin="true" v-if="question[`quesType`] === 'aud'" />
              </v-card>

            </v-container>
          </v-container>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Audio from "../components/Audio";
import Normalques from "../components/Normalques";
import Imageques from "../components/Imageques";
import Mcq from "../components/Mcq";
import Sidenav from "../components/layout/Sidenav";
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
export default {
  components: {
    Sidenav,
    Audio,
    // draggable,
    Normalques,
    Imageques,
    Mcq
  },
  data: () => ({
    quesText: "",
    quesLink: "",
    questions: [],
    loading: false,
    loading1: false,
    snackbar: false,
    file: "",
    adminUser: "",
    score: 0,
    items: ["mcq", "img", "aud", "nor"],
    quesType: "",
    options: "",
    time: 10,
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ]
  }),
  methods: {
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
    addRound() {
      this.loading1 = !this.loading1;
      var round = { time: this.time, questions: this.questions };
      common.addround(round).then(res => {
        console.log(res.data);
        this.loading1 = false;
        this.snackbar = true;
        this.questions = [];
        localStorage.removeItem("questions");
      });
    },
    deleteques(index) {
      this.questions.splice(index, 1);
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
    }
  },
  mounted() {
    console.log("App mounted!");
    if (localStorage.getItem("questions"))
      this.questions = JSON.parse(localStorage.getItem("questions"));
    else localStorage.removeItem("questions");
  },
  beforeCreate() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role ===
      "s"
    ) {
      this.$router.push("/");
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  watch: {
    questions: {
      handler() {
        console.log("Questions changed!");
        localStorage.setItem("questions", JSON.stringify(this.questions));
      },
      deep: true
    },
    file: {
      handler() {
        console.log(this.file);
      }
    }
  }
};
</script>

<style scoped></style>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
