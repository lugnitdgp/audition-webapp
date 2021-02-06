<template>
  <div id="app">
    <span class="bg"></span>

    <v-content>
      <div class="home-wrap" v-if="token != null">
        <div class="home-card">
          <div class="head-wrap">
            <h1 class="glitch">WELCOME</h1>
            <h4 class="glitch">TO GLUG AUDITION</h4>
          </div>
          <v-container class="mt-5">
            <v-row align="center" justify="center" class="btns">
                <div class="button" @click="logout">
                  <span>LOG OUT</span>
                  <svg>
                    <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                    <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                  </svg>
                </div>
              <router-link tag="span" to="/event">
                <div class="button2">
                  <span>DASHBOARD</span>
                  <svg>
                    <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                    <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                  </svg>
                </div>
              </router-link>
            </v-row>
          </v-container>
        </div>
      </div>
      <div class="home-wrap" v-if="token === null">
        <div class="home-card">
          <div class="head-wrap">
            <h1 class="glitch">WELCOME</h1>
            <h4 class="glitch">TO GLUG AUDITIONS</h4>
          </div>
          <v-container class="mt-5">
            <v-row align="center" justify="center" class="btns">
              <router-link tag="span" to="/login">
                <div class="button">
                  <span>LOGIN</span>
                  <svg>
                    <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                    <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                  </svg>
                </div>
              </router-link>
              <router-link tag="span" to="/register">
                <div class="button2">
                  <span>REGISTER</span>
                  <svg>
                    <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                    <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0" />
                  </svg>
                </div>
              </router-link>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
import common from "@/services/common.js";

export default {
  components: {},
  data: () => ({
    token: null
  }),
  props: {
    source: String
  },
  beforeCreate() {
    var token = this.$route.query.token;
    if (token != null) {
      token = "Bearer " + token;
      localStorage.setItem("token", token);
      this.$router.push("/event");
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted() {
    this.token = localStorage.getItem('token');
  },
  methods : {
    logout() {
      // eslint-disable-next-line no-unused-vars
      common.logout().then(res => {
        localStorage.clear();
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
#app {
  height: 100vh;
  font-family: "Ubuntu", sans-serif;
}
.btns span {
  padding: 10px 20px;
}
.nav-wrap {
  height: 10vh;
}
.home-wrap {
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.head-wrap {
  width: 100%;
  text-align: center;
}
.home-card {
  width: 90%;
  max-width: 700px;
  padding: 70px 30px;
  backdrop-filter: blur(9px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0px 0px 40px rgb(0, 2, 26);
  border: 0px solid rgb(1, 0, 46);
  border-bottom: 8px solid rgb(161, 183, 255);
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/img/f.gif") no-repeat center center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.7;
}
.glitch {
  font-size: 3rem;
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
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button svg {
  height: 55px;
  width: 150px;
  fill: none;
  stroke-width: 5;
  border-radius: 3px;
}
.button svg .o1 {
  stroke: rgba(25, 59, 255, 0.7);
  fill: rgba(25, 59, 255, 0.7);
  transition: all 1s ease-in-out;
}
.button svg .o2 {
  stroke: white;
  stroke-dasharray: 20 420;
  stroke-dashoffset: 20;
  transition: all 1s ease-in-out;
}
.button span {
  position: absolute;
  margin: auto 0;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.button:hover .o1 {
  fill: rgba(16, 60, 204, 0.3);
}
.button:hover .o2 {
  stroke-dashoffset: -420;
}

.button2 {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
