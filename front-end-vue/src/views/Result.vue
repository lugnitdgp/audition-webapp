<template>
  <v-container>
    <span class="bg"></span>
    <h1 class="glitch" style="text-align: center;">Results for Round {{ audition.round }}</h1>
    <div class="table-wrap">
    <!-- <v-data-table
    dense
      :headers="headers"
      hide-default-footer
      :items="items"
      color="red"
     class="elevation-1"
    >
      <template v-slot:item="row">
        <tr v-show="row.item.status === 'unevaluated'">
          <td>{{ row.item.name }}</td>
        </tr>
      </template>
    </v-data-table> -->
    <div class="trowhead">selected students</div>
    <div v-for="(item,i) in items" :key="i">
      <div v-show="item.status === 'unevaluated'" class="trow">{{item.name}}</div>
    </div>
    </div>
    <v-snackbar v-model="snackbar">
      Be patient
    </v-snackbar>
  </v-container>
</template>

<script>
import common from "@/services/common.js";

export default {
  data() {
    return {
      items: [],
      snackbar: false,
      audition: [],
      headers: [{ text: "Selected Candidates", align: "start", value: "name" }],
    };
  },
  beforeCreate() {
    common.getAuditionStatus().then((res) => {
      console.log(res);
      this.audition = res.data;
      if (this.audition.status !== "res") {
        console.log("lol");
      }
    });
    common.getResult().then((res) => {
      console.log(res);
      this.items = res.data;
      console.log(this.items);
    });
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/img/f.gif") no-repeat center center;
  background-size: cover;
  filter: blur(0px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.7;
}
.table-wrap{
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  margin: 0 auto;
  overflow-y: scroll;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.trowhead{
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
.trow{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff !important;
  width: 100%;
  opacity: 1 !important;
  background-color: rgba(255,255,255,0.08);
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
