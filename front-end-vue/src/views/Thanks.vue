<template>
  <div>
    <div class="wrap">
      <div class="mx-auto tcard">
        <v-img
          src="https://media.giphy.com/media/h8a5YM9X3mIXOkSfWh/giphy.gif"
          height="300px"
          style="border-radius: 20px;"
        ></v-img>

        <div class="glitch">Thanks for attempting</div>
        <router-link tag="span" to="/event">
          <div class="button2">
            <span>DASHBOARD</span>
            <svg>
              <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
              <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import common from "@/services/common.js";
import axios from "axios";

export default {
  components: {},
  data: () => ({
    member: false,
    su: false,
    audition: []
  }),
  name: "Landing",
  beforeCreate() {
    common.getAuditionStatus().then(res => {
      // console.log(res);
      this.audition = res.data;
    });
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    } else {
      axios.get().then(res => {
        // console.log(res.data);
        if (res.data.isAdmin === false) {
          // console.log(res.data);
        } else {
          alert("You are the Admin. Accessing wrong route, re-routing");
          this.$router.push("/");
        }
      });
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tcard {
  width: 90%;
  max-width: 350px;

  backdrop-filter: blur(8px);
  border-radius: 20px;
}
.glitch {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
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
  .home-card {
    width: 90%;
    max-width: 700px;
    padding: 90px 30px;
  }
  .btns {
    margin-top: 20px;
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
.button2 {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "Ubuntu", sans-serif;
}
.button2 svg {
  height: 55px;
  width: 150px;
  fill: none;
  stroke-width: 5;
  border-radius: 3px;
}
.button2 svg .o1 {
  stroke: rgba(255, 24, 101, 0.7);
  fill: rgba(255, 24, 101, 0.7);
  transition: all 1s ease-in-out;
}
.button2 svg .o2 {
  stroke: white;
  stroke-dasharray: 20 420;
  stroke-dashoffset: 20;
  transition: all 1s ease-in-out;
}
.button2 span {
  position: absolute;
  margin: auto 0;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.button2:hover .o1 {
  fill: rgba(204, 16, 163, 0.3);
}
.button2:hover .o2 {
  stroke-dashoffset: -420;
}
</style>
