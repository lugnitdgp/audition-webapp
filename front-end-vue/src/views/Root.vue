<template>
  <div id="app">
    <!-- <div v-if="audition.status === 'ong'">ONGOING</div>
                <div v-if="audition.status === 'def'">STOPPED</div>
                <div v-if="audition.status === 'res'">RESULT PUSHED</div> -->
    <Sidenav :roundNo='audition.round' status='ONGOING' v-if="audition.status === 'ong'" />
    <Sidenav :roundNo='audition.round' status='STOPPED' v-if="audition.status === 'def'" />
    <Sidenav :roundNo='audition.round' status='RESULT PUSHED' v-if="audition.status === 'res'" />
    <v-app id="inspire">
      <template>
        <v-container>
          <v-btn
            color="primary"
            @click="btnHandler()"
            :loading="loading1"
            :disabled="loading1"
          >
            {{ btntext }}
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            color="primary"
            @click="$router.push('/log')"
          >
            Check Logs
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-container>
            <!-- <v-alert outlined color="error">
              <div class="title">Round: {{ audition.round }}</div>
            </v-alert> -->
            <!-- <v-alert outlined color="purple">
              <div class="title">
                Status:
                <div v-if="audition.status === 'ong'">ONGOING</div>
                <div v-if="audition.status === 'def'">STOPPED</div>
                <div v-if="audition.status === 'res'">RESULT PUSHED</div>
              </div>
              
            </v-alert> -->
            <v-btn
                class="mx-2"
                light
                v-if="audition.status === 'ong'"
                small
                v-on:click="extendtime"
                >Extend Time (By 10 min)</v-btn
              >
          </v-container>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
          <v-card>
            <v-card>
              <v-tabs
                dark
                background-color="teal darken-3"
                show-arrows
                v-model="tab"
              >
                <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                <v-tab v-for="role in roles" :key="role">{{ role }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item :key="su">
                  <v-container>
                    <v-data-table
                      disable-pagination
                      :headers="headers"
                      hide-default-footer
                      :items="items"
                      :search="search"
                      class="elevation-1"
                    >
                      <template v-slot:item="row">
                        <tr v-show="row.item.role === 'su'">
                          <td>{{ row.item.name }}</td>
                          <td>{{ row.item.email }}</td>
                          <td>{{ row.item.status }}</td>

                          <td>{{ row.item.role }}</td>

                          <td>
                            <template>
                              <v-btn
                                class="mx-2"
                                light
                                small
                                v-on:click="(dialog = true), (item = row.item)"
                                >SET ROLE</v-btn
                              >
                            </template>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </v-tab-item>
                <v-tab-item :key="m">
                  <v-container>
                    <v-data-table
                      disable-pagination
                      :headers="headers"
                      hide-default-footer
                      :items="items"
                      :search="search"
                      class="elevation-1"
                    >
                      <template v-slot:item="row">
                        <tr v-show="row.item.role === 'm'">
                          <td>{{ row.item.name }}</td>
                          <td>{{ row.item.email }}</td>
                          <td>{{ row.item.status }}</td>

                          <td>{{ row.item.role }}</td>

                          <td>
                            <template>
                              <v-btn
                                class="mx-2"
                                light
                                small
                                v-on:click="(dialog = true), (item = row.item)"
                                >SET ROLE</v-btn
                              >
                            </template>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </v-tab-item>

                <v-tab-item :key="s">
                  <v-container>
                    <v-data-table
                      disable-pagination
                      :headers="headers"
                      hide-default-footer
                      :items="items"
                      :search="search"
                      class="elevation-1"
                    >
                      <template v-slot:item="row">
                        <tr v-show="row.item.role === 's'">
                          <td>{{ row.item.name }}</td>
                          <td>{{ row.item.email }}</td>
                          <td>{{ row.item.status }}</td>
                          <td>{{ row.item.role }}</td>

                          <td>
                            <template>
                              <v-btn
                                class="mx-2"
                                light
                                small
                                v-on:click="(dialog = true), (item = row.item)"
                                >SET ROLE</v-btn
                              >
                            </template>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-card>
        </v-container>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">CHANGE ROLE</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="role"
                      :items="['su', 'm', 's']"
                      label="ROLE"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-show="role === 'm'"
                      v-model="clearance"
                      label="Set clearence of members"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closedialog"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="changeRole(item.uid)"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar">{{ text }}</v-snackbar>
        <v-snackbar
          v-model="roleSnackbar"
          class="text-center"
          color="success"
          :timeout="2000"
          >Role Changed</v-snackbar
        >
         <v-snackbar
          v-model="extendtimeSnackbar"
          class="text-center"
          color="success"
          :timeout="2000"
          >Time Extended for all students by 10 minutes</v-snackbar
        >
      </template>
    </v-app>
  </div>
</template>

<script>
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
import Sidenav from "../components/layout/Sidenav";

export default {
  name: "Landing",

  components: {
    Sidenav,
  },
  data() {
    return {
      drawer: false,
      adminUser: "",
      items: [],
      expand: false,
      darkmode: false,
      loading: false,
      snackbar: false,
      roleSnackbar: false,
      extendtimeSnackbar:false,
      text: "",
      roles: ["Super User", "Member", "Student"],
      item: [],
      round: null,
      dialog: false,
      audition: [],
      role: "",
      btntext: "",
      search: "",
      clearance: 1,
      headers: [
        { text: "FULL NAME", align: "start", value: "name" },
        { text: "Email", align: "start", value: "email" },
        { text: "STATUS", align: "start", value: "status" },
        { text: "CURRENT ROLE", align: "start", value: "details" },
        { text: "CHANGE ROLE", align: "start", value: "role" },
      ],
      tab: null,
      rounds: ["web", "shopping", "videos", "images", "news"],
    };
  },

  created() {
    this.adminUser = VueJwtDecode.decode(
      localStorage.getItem("token").substring(6)
    ).UserName;

    console.log(this.adminUser);
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.audition = res.data;
      if (this.audition.status === "ong") {
        this.btntext = "STOP ROUND";
      } else if (this.audition.status === "res") {
        this.btntext = "PUSH ROUND";
      } else if (this.audition.status === "def") {
        this.btntext = "PUBLISH RESULT";
      }
    });
    common.getUsers().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.items = res.data.doc;
      } else if (res.status === 401) {
        alert("UNAUTHORISED ACCESS");
        localStorage.clear("token");
        this.$router.push("/");
      } else {
        alert("No data");
      }
    });

    this.$vuetify.theme.dark = true;
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
  methods: {
    btnHandler() {
      this.loading = !this.loading;
      if (this.audition.status === "ong") {
        common.stopRound().then(() => {
          this.btntext = "PUBLISH RESULT";
          this.audition.status = "def";
          this.loading = false;
          this.text = "Round has been stopped";
        });
      } else if (this.audition.status === "res") {
        this.loading = !this.loading;
        common.pushRound().then(() => {
          this.btntext = "STOP ROUND";
          this.audition.round += 1;
          this.audition.status = "ong";
          this.loading = false;
          this.text = "Round has been successfully pushed";
        });
      } else if (this.audition.status === "def") {
        this.loading = !this.loading;
        common.pushResult().then((res) => {
          console.log(res);
          if (res.data.status === true) {
            this.btntext = "PUSH ROUND";
            this.audition.status = "res";
            this.loading = false;
            this.text = "Results published";
          } else {
            alert("SOME STUDENTS ARE STILL UNEVALUATED");
          }
        });
      }
      common.getAuditionStatus().then((res) => {
        console.log(res);
        this.audition = res.data;
        if (this.audition.status === "ong") {
          this.btntext = "STOP ROUND";
        } else if (this.audition.status === "res") {
          this.btntext = "PUSH ROUND";
        } else if (this.audition.status === "def") {
          this.btntext = "PUBLISH RESULT";
        }
      });
    },
    extendtime(){
      common.extendtime({id:'all'}).then(()=>{
        this.extendtimeSnackbar=true;
      })
    },
    closedialog() {
      (this.dialog = false), (this.clearance = 1), (this.role = "");
    },
    changeRole(id) {
      var a = {
        _id: id,
        role: this.role,
      };
      common.changeRole(a).then(() => {
        if (this.role === "m") {
          var b = {
            _id: id,
            clearance: this.clearance,
          };
          common.setClearance(b).then((res) => {
            console.log(res.data);
            this.roleSnackbar = true;
            this.dialog = false;
          });

          common.getUsers().then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              this.items = res.data.doc;
            }
          });
        } else {
          this.roleSnackbar = true;
          this.dialog = false;
          common.getUsers().then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              this.items = res.data.doc;
            }
          });
        }
      });
    },
  },

  watch: {
    tab: {
      handler() {
        console.log(this.tab);
      },
      deep: true,
    },
    darkmode(newvalue) {
      this.$vuetify.theme.dark = newvalue;
    },
  },
};
</script>
