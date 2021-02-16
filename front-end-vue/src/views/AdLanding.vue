<template>
  <v-app>
    <Sidenav />
    <v-content style="margin-bottom: 100px;">
      <v-container fluid>
        <div>
          <v-spacer>
            <v-alert outlined color="#00FFFF">
              <h1 class="text-center">STUDENTS DASHBOARD</h1>
            </v-alert>
          </v-spacer>
        </div>
        <v-spacer />
        <v-spacer />
        <v-container absolute fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" lg="3">
              <v-alert outlined color="#00FFFF">
                <v-list-item>
                  <v-list-item-content>
                    <div class="subtitle-2">TOTAL STUDENTS</div>
                    <v-list-item-title class="display-2">
                      {{ items.length }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="90">
                    <v-img src="../assets/img/stu.png"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-alert>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-alert outlined color="success">
                <v-list-item>
                  <v-list-item-content>
                    <div class="subtitle-2">COMPLETED</div>
                    <v-list-item-title class="display-2">{{
                      completed.length
                    }}</v-list-item-title>
                    <v-list-item-subtitle></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="90">
                    <v-img src="../assets/img/t.png"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-alert>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-alert outlined color="warning">
                <v-list-item>
                  <v-list-item-content>
                    <div class="subtitle-2">PENDING</div>
                    <v-list-item-title class="display-2">{{
                      items.length - completed.length
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar tile size="90">
                    <v-img
                      style="height: 100px"
                      src="../assets/img/w.png"
                    ></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-alert>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" v-if="round != 0">
            <v-col cols="12" sm="6" lg="3" align="center" justify="center">
              <v-alert outlined color="success">
                <v-list-item v-for="(item, i) in round" :key="i">
                  <v-list-item-content>
                    <div class="subtitle-3">
                      ROUND {{ i + 1 }} - {{ count(i) }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
        <template>
          <v-container>
            <v-card>
              <v-card>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  hide-details
                ></v-text-field>
                <v-spacer />
                <div v-if="round > 0">
                  <v-tabs
                    dark
                    center-active
                    background-color="teal darken-3"
                    show-arrows
                    v-model="tab"
                  >
                    <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                    <v-tab v-for="i in round" :key="i">Round {{ i }}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in round" :key="i">
                      <v-container v-if="i < round">
                        <v-data-table
                          disable-pagination
                          :headers="headers.slice(0, -1)"
                          hide-default-footer
                          :items="items"
                          :search="search"
                          class="elevation-1"
                        >
                          <template v-slot:item="row">
                            <tr v-show="row.item.round >= tab + 1">
                              <td @click="usercontrol(row.item)">
                                {{ row.item.name }}
                              </td>
                              <td @click="usercontrol(row.item)">
                                {{ row.item.status }}
                              </td>
                              <td @click="usercontrol(row.item)">
                                {{ row.item.lastUser }}
                              </td>
                              <td>{{ row.item.email }}</td>
                              <td>{{ row.item.phone }}</td>
                              <td>{{ row.item.roll }}</td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-container>
                      <v-container v-if="i === round">
                        <v-data-table
                          disable-pagination
                          :headers="headers"
                          hide-default-footer
                          :items="items"
                          :search="search"
                          class="elevation-1"
                        >
                          <template v-slot:item="row">
                            <tr v-show="row.item.round >= tab + 1">
                              <td @click="usercontrol(row.item)">
                                {{ row.item.name }}
                              </td>
                              <td @click="usercontrol(row.item)">
                                {{ row.item.status }}
                              </td>

                              <td @click="usercontrol(row.item)">
                                {{ row.item.lastUser }}
                              </td>
                              <td>{{ row.item.email }}</td>
                              <td>{{ row.item.phone }}</td>
                              <td>{{ row.item.roll }}</td>
                              <td @click="popup(row.item)" class="details">
                                <v-icon>mdi-open-in-new</v-icon>
                              </td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-container>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
                <div v-if="round === 0">
                  <v-container>
                    <v-data-table
                      disable-pagination
                      :headers="headers1"
                      hide-default-footer
                      :items="items"
                      :search="search"
                      class="elevation-1"
                    >
                      <template v-slot:item="row">
                        <tr align="center" justify="center">
                          <td>{{ row.item.name }}</td>
                          <td>{{ row.item.phone }}</td>
                          <td>{{ row.item.roll }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-container>
                </div>
              </v-card>
            </v-card>
          </v-container>
        </template>
      </v-container>
    </v-content>
  </v-app>
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
      search: "",
      adminUser: "",
      items: [],
      completed: [],
      expand: false,
      darkmode: false,
      round: null,
      headers: [
        { text: "FULL NAME", align: "start", value: "name" },
        { text: "STATUS", align: "start", value: "status" },
        { text: "LAST VIEWED", align: "start", value: "lastUser" },
        { text: "E-mail", align: "start", value: "email" },
        { text: "Phone", align: "start", value: "phone" },
        { text: "Roll Number", align: "start", value: "roll" },
        { text: "DETAILS", align: "start", value: "details" },
      ],
      headers1: [
        { text: "FULL NAME", align: "center", value: "name" },
        { text: "Phone", align: "start", value: "phone" },
        { text: "Roll Number", align: "start", value: "roll" },
      ],
      tab: 0,
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
      this.round = res.data.round;
      this.tab = this.round - 1;
    });
    common.getUsers().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.items = res.data.doc;
        this.items = this.items.filter((item) => item.role === "s");
        this.completed = this.items.filter(
          (item) => item.status === "selected" || item.status === "rejected"
        );
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
    logout() {
      // eslint-disable-next-line no-unused-vars
      common.logout().then((res) => {
        localStorage.clear();
        this.$router.push("/");
      });
    },
    usercontrol(a) {
      var payload = a;
      payload["lastUser"] = this.adminUser;
      console.log(this.adminUser);
      common.updateEntry(payload);
      this.$router.push({
        name: "UserControl",
        query: { id: a._id },
      });
    },
    popup(a) {
      var payload = a;
      payload["lastUser"] = this.adminUser;
      console.log(this.adminUser);
      common.updateEntry(payload);
      let routeData = this.$router.resolve({
        name: "UserControl",
        query: { id: a._id },
      });

      window.open(routeData.href, "_blank");
    },
    count(index) {
      return this.items.filter((item) => item.round >= index + 1).length;
    },
  },
  watch: {
    darkmode(newvalue) {
      this.$vuetify.theme.dark = newvalue;
    },
  },
};
</script>

<style scoped>
tr,
.details {
  cursor: pointer;
}
.subtitle-3 {
  font-size: 1.5rem;
}
</style>
