<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      hide-details
    ></v-text-field>
    <v-data-table
      disable-pagination
      :headers="headers"
      :search="search"
      hide-default-footer
      :items="messages.slice().reverse()"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>
            {{ row.item.time }}
          </td>
          <td>
            {{ row.item.user }}
          </td>
          <td>
            {{ row.item.message }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
 
<script>
import VueJwtDecode from "vue-jwt-decode";
// We store the reference to the SSE object out here
// so we can access it from other methods
//let msgServer;

export default {
  name: "sse-test",
  data() {
    return {
      messages: [],
      search: "",
      headers: [
        { text: "Time", align: "start", value: "time" },
        { text: "User", align: "start", value: "user" },
        { text: "Message", align: "start", value: "message" },
      ],
    };
  },
  created() {
    let es = new EventSource(`${process.env.VUE_APP_BASE_URL}events`);
    console.log(es);
    es.onmessage = (event) => {
      JSON.parse(event.data).forEach((log) => {
        this.messages.push(log);
      });
    };
  },
  beforeCreate() {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else if (
      VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role !=
      "su"
    ) {
      this.$router.push("/");
    }
  },
};
</script> 