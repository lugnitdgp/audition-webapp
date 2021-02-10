<template>
  <v-app>
    <v-container fluid>
      <v-alert outlined color="#00FFFF">
        <h2 class="text-center">
          {{ details.name.toUpperCase() }} - {{ details.email }}
        </h2>
      </v-alert>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col md="8">
          <v-card>
            <v-toolbar dark flat>
              <template v-slot:extension>
                <v-tabs v-model="tab" align-with-title color="#B2EBF2" show-arrows>
                  <v-tabs-slider color="#9fef00"></v-tabs-slider>

                  <v-tab v-for="round in answers" :key="round.roundNo">
                    Round {{ round.roundNo }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="round in answers" :key="round.roundNo">
                <v-card
                  flat
                  v-for="question in round.questions"
                  :key="question._id"
                >
                  <Normalques
                    :question="question"
                    :studentanswer="question.answer"
                    :admin="true"
                    v-if="question[`quesType`] === 'nor'"
                  />
                  <Imageques
                    :question="question"
                    :studentanswer="question.answer"
                    :admin="true"
                    v-if="question[`quesType`] === 'img'"
                  />
                  <Mcq
                    :question="question"
                    :studentanswer="question.answer"
                    :admin="true"
                    v-if="question[`quesType`] === 'mcq'"
                  />
                  <Audio
                    :question="question"
                    :studentanswer="question.answer"
                    :admin="true"
                    v-if="question[`quesType`] === 'aud'"
                  />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-col md="4">
          <div>
            <v-alert outlined color="#00FFFF">
              <div class="title"></div>
              <div>
                <template>
                  <v-container fluid>
                    <v-select
                      :disabled="clearance"
                      v-model="status"
                      :items="options"
                      v-on:change="changeStatus()"
                      label="SELECTION STATUS"
                      solo
                    ></v-select>
                  </v-container>
                </template>
              </div>
              <template>
                <v-expansion-panels color="#B2EBF2" inset>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      SUBMIT FEEDBACK
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row align="center" justify="center">
                        <v-col>
                          <v-textarea
                            v-model="feedback"
                            label="FEEDBACK"
                            name="feedback"
                            outlined
                            color="#00FFFF"
                            type="text"
                          ></v-textarea>

                          <v-card-actions>
                            <v-spacer />
                            <v-btn @click="submitFeedback" color="#00FFFF"
                              >SUBMIT</v-btn
                            >
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
            </v-alert>
            <v-alert outlined color="#00FFFF">
              <div class="title">FEEDBACKS</div>

              <div>
                <v-data-iterator
                  :items="details.feedback"
                  item-key="_id"
                  :single-expand="expand"
                >
                  <template v-slot:default="{ items }">
                    <v-row>
                      <v-col
                        v-for="item in items"
                        :key="item._id"
                        cols="40"
                        sm="12"
                      >
                        <v-alert outlined color="#00FFFF">
                          <v-list-item-content>{{
                            item.feedback
                          }}</v-list-item-content>
                          <v-divider
                            class="my-4 info"
                            style="opacity: 0.22"
                          ></v-divider>
                          <v-list-item-content>
                            <v-list-item-title>
                              - {{ item.user }}</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-alert>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </div>
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="statusSnackbar" color="success" elevation="12" app>{{ statusUpdate }}</v-snackbar>
    <v-snackbar v-model="feedsnack" color="success" elevation="12" app>FEEDBACK SUBMITTED</v-snackbar>
  </v-app>
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
  name: "Landing",
  components: {
    Imageques,
    Audio,
    Normalques,
    Mcq,
  },
  data() {
    return {
      adminUser: "",
      details: [],
      flag: false,
      feedback: "",
      rounds: [],
      expand: false,
      answers: [],
      type: null,
      tab: null,
      dialog: false,
      status: "",
      clearance: true,
      options: ["unevaluated", "selected", "review", "rejected"],
      statusSnackbar: false,
      statusUpdate: "",
      feedsnack: false ,
    };
  },
  beforeCreate() {
    const a = { id: this.$route.query.id };
    console.log(a);
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role ===
      "s"
    ) {
      this.$router.push("/");
    } else {
      console.log(
        VueJwtDecode.decode(localStorage.getItem("token").substring(6))
          .clearance
      );
      common.getUser(a).then((res) => {
        if (res.status === 200) {
          this.details = res.data;
          console.log(this.details);
          this.status = res.data.status;
          if (
            VueJwtDecode.decode(localStorage.getItem("token").substring(6))
              .clearance >= res.data.round ||
            VueJwtDecode.decode(localStorage.getItem("token").substring(6))
              .role === "su"
          ) {
            this.clearance = false;
          }
          console.log(res);

          common.getRounds().then((response) => {
            this.rounds = response.data;
            this.details.answers.forEach((round) => {
              var findround = this.rounds.find(
                (element) => element.roundNo == round.roundNo
              );
              var roundentry = {
                roundNo: round.roundNo,
                questions: [],
              };
              round.questions.forEach((question) => {
                var foundques = findround.questions.find(
                  (element) => element._id === question.qid
                );
                var a = {
                  quesType: question.qtype,
                  answer: question.answer,
                  _id: question.qid,
                  quesLink: foundques.quesLink,
                  quesText: foundques.quesText,
                  options: foundques.options,
                };
                roundentry.questions.push(a);
              });

              this.answers.push(roundentry);
            });
          });
          console.log("hbfjkfkkfn");
          console.log(this.answers);
        } else if (res.status === 401) {
          alert("UNAUTHORISED ACCESS");
          localStorage.clear("token");
          this.$router.push("/");
        } else {
          alert("No data");
        }
      });
    }
  },
  created() {
    this.adminUser = VueJwtDecode.decode(
      localStorage.getItem("token").substring(6)
    ).UserName;
  },
  methods: {
    submitFeedback() {
      const a = {
        feedback: this.feedback,
        user: this.adminUser,
        round: this.details.round,
      };
      this.details.feedback.push(a);
      common.updateFeedback(this.details).then(() => {
        this.feedsnack = true
        // alert(res.data.message);
      });
    },
    changeStatus() {
      if (this.status != "unevaluated") {
        this.details.status = this.status;
        this.updateEntry();
      }
    },
    updateEntry() {
      this.statusSnackbar = true;
      var a = this.details;
      common.updateEntry(a).then((res) => {
        this.statusUpdate = res.data.message;
        // alert(res.data.message);
      });
    },
  },
};
</script>
