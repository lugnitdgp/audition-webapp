<template>
  <v-app>
    <v-content>
      <v-card class="mx-auto overflow-hidden">
        <v-app-bar>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>GLUG AUDITIONS 2020</v-toolbar-title>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn @click="logout" color="light-blue darken-1">Logout</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="purge" color="light-blue darken-1">PURGE</v-btn>
        </v-app-bar>
      </v-card>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--lighten-2"
          >
            <router-link tag="span" to="/">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item>
              <v-switch v-model="darkmode" label="Dark Mode"></v-switch>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-container fluid>
        <div>
          <v-spacer>
            <h1>Welcome, {{ adminUser }}</h1>
          </v-spacer>
        </div>
        <v-spacer />
        <v-spacer />
        <v-container absolute fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" lg="3">
              <v-card class="mx-auto" outlined color="#2196F3">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="subtitle-2">TOTAL STUDENTS</div>
                    <v-list-item-title class="display-2">{{
                      items.length
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="90">
                    <v-img src="../assets/img/stu.png"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="mx-auto" outlined color="#76FF03">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="subtitle-2">COMPLETED</div>
                    <v-list-item-title class="display-2"></v-list-item-title>
                    <v-list-item-subtitle>vvv</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="90">
                    <v-img src="../assets/img/tick.png"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="mx-auto" outlined color="#FFAB00">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="subtitle-2">PENDING</div>
                    <v-list-item-title class="display-2"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-avatar tile size="90">
                    <v-img src="../assets/img/pend.png"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-data-table
          :headers="headers"
          hide-default-footer
          :items="items"
          class="elevation-1"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.selected.status }}</td>
              <td>{{ row.item.final.status }}</td>
              <td>{{ row.item.lastUser }}</td>
              <td>{{ row.item.selected.user }}</td>
              <td>
                <v-btn
                  class="mx-2"
                  light
                  small
                  @click="usercontrol(row.item)"
                  >Detail</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import common from "@/services/common.js";
export default {
  name: "Landing",
  components: {},

  data() {
    return {
      drawer: false,
      adminUser: localStorage.getItem("admin"),
      items: [],
      expand: false,
      darkmode: false,
      headers: [
        { text: "FULL NAME", align: "start", value: "name" },
        { text: "STATUS", align: "start", value: "status" },
        { text: "FINAL STATUS", align: "start", value: "final status" },
        { text: "LAST VIEWED", align: "start", value: "details" },
        { text: "LAST CHANGED", align: "start", value: "details" },
        { text: "DETAILS", align: "start", value: "details" },
      ],
    };
  },
  watch: {
    darkmode(newvalue) {
      this.$vuetify.theme.dark = newvalue;
    },
  },
  created() {
    if (localStorage.getItem("token") === null) {
      localStorage.clear();
      this.$router.push("/");
    } else {
      common.getUsers().then((res) => {
        if (res.status === 200) {
          this.items = res.data.doc;
        } else if (res.status === 401) {
          alert("UNAUTHORISED ACCESS");
          localStorage.clear("token");
          this.$router.push("/");
        } else {
          alert("No data");
        }
      });
    }
    this.$vuetify.theme.dark = true;
  },
  methods: {
    logout() {
      common.logout().then((res) => {
        localStorage.clear();
        alert(res.data);
        this.$router.push("/AdLog");
      });
    },
    usercontrol(a) {
      var payload = a;
      payload['lastUser']=this.adminUser 
      common.updateEntry(payload)
      let routeData = this.$router.resolve({
        name: "UserControl",
        query: { id: a._id },
      });
      window.open(routeData.href, "_blank");
    },
    purge() {
      common.purge().then((res) => {
        alert(res.data.message);
        location.reload();
      });
    },
  },
};
</script>
