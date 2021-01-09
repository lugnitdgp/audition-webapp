<template>
  <v-app>
    <v-toolbar color="primary" flat>
      <v-toolbar-title
        >Welcome to the details of <strong>{{ details.name }}</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-btn
        :disabled="details.final.status"
        @click="selectionstatus"
        color="black"
        >Change Selection Status</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click="finalise" color="red">Finalise Audition process</v-btn>
    </v-toolbar>
    <v-spacer />
    <v-spacer />
    <v-container fluid>
      <v-toolbar class="mb-2" color="green darken-4" dark flat>
        <v-toolbar-title
          >Current Round : {{ details.round }} Current selection status :
          {{ details.selected.status }} by
          <strong>{{ details.selected.user }}</strong></v-toolbar-title
        >
      </v-toolbar>
    </v-container>
    <v-spacer />
    <v-spacer />
    <v-container fluid>
      <v-data-iterator :items="details.answers" :single-expand="expand">
        <template v-slot:header>
          <v-toolbar class="mb-2" color="deep-purple darken-1" dark flat>
            <v-toolbar-title>User Answers across all rounds</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item._id"
              cols="40"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title>
                  <h4>Answer in {{ item.round }}</h4>
                </v-card-title>

                <v-divider></v-divider>
                <v-list dense>
                  <v-container fluid>
                    <h1>{{ item.question }}</h1>
                    <p>
                      {{ item.answer }}
                    </p>
                  </v-container>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    <v-spacer />
    <v-spacer />
    <v-container fluid>
      <v-data-iterator
        :items="details.feedback"
        item-key="_id"
        :single-expand="expand"
      >
        <template v-slot:header>
          <v-toolbar class="mb-2" color="red darken-4" dark flat>
            <v-toolbar-title>Feedback data</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item._id"
              cols="40"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title>
                  <h4>
                    Feed-back by {{ item.user }} in Round {{ item.round }}
                  </h4>
                </v-card-title>

                <v-divider></v-divider>
                <v-list dense>
                  <v-container fluid>
                    {{ item.feedback }}
                  </v-container>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>

    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer></v-spacer>
              <v-toolbar-title> Your Feedback </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-spacer />
            <v-card-text>
              <v-textarea
                v-model="feedback"
                label="YOUR feedback"
                name="feedback"
                outlined
                type="text"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="submitFeedback" color="teal darken-3"
                >Post your feedback</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import common from '@/services/common.js'

export default {
  name: "Landing",
  data() {
    return {
      adminUser: localStorage.getItem("admin"),
      details: [],
      flag: false,
      feedback: "",
      expand: false,
    };
  },
  beforeCreate() {
    const a = { id: this.$route.query.id };
    console.log(a);
    if (localStorage.getItem("token") === null) {
      localStorage.clear();
      this.$router.push("/");
    } else {
      common.getUser(a).then((res) => {
        if (res.status === 200) {
          this.details = res.data;
          console.log(res);
        } else if (res.status === 401) {
          alert("UNAUTHORISED ACCESS");
          localStorage.clear("token");
          this.$router.push("/");
        } else {
          alert("No data");
        }
      })
    }
  },
  methods: {
    submitFeedback() {
      const a = {
        feedback: this.feedback,
        user: this.adminUser,
        round: this.details.round,
      };
      this.details.feedback.push(a);
      this.updateEntry();
    },
    selectionstatus() {
      this.details.selected = {
        status: !this.details.selected.status,
        user: this.adminUser,
      };
      this.updateEntry();
    },
    finalise() {
      this.details.final = { status: true, user: this.adminUser };
      alert("You've finalised this candidate's audition procedure");
      this.updateEntry();
    },
    updateEntry() {
      var a = this.details;
      common.updateEntry(a).then((res) => {
        alert(res.data.message);
      });
    },
  },
};
</script>