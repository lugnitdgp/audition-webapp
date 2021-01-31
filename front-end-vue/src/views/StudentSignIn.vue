<template>
  <v-app id="inspire">
    <v-content>
      <span class="bg"></span>
      <div class="login-box">
        <h2 class="glitch">LOGIN</h2>
        <v-form class="elevaton-23">
          <v-text-field
            v-model="email"
            class="user-box"
            label="Email"
            name="login"
            prepend-icon="email"
            type="text"
          />
          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            lass="user-box"
          />
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-container align="center">
            <v-row align="center" justify="center">
              <v-col cols="8">
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  block
                  outlined
                  color="blue"
                  @click="send"
                  style="border-radius: 20px;"
                >
                  LOGIN
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon color="blue">mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center" class="mt-2">
              <v-col
                cols="6"
                align="center"
                justify="center"
                style="display:flex; justify-content: flex-end;"
              >
                <v-btn color="red" outlined fab large @click="goauth">
                  <v-icon>mdi-google</v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="6"
                align="center"
                justify="center"
                style="display:flex; justify-content: flex-start;"
              >
                <v-btn color="blue" outlined fab large @click="githuboauth">
                  <i class="fab fa-github"></i>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-row class="mt-3" align="center" justify="center">
              <p align="center" class="text-center">
                Don't have an account ?
                <a
                  @click="$router.push('/register')"
                  style="color: cyan !important;"
                >Register</a>
              </p>
            </v-row>
          </v-container>
        </v-card-actions>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import common from "@/services/common.js";

export default {
  components: {},
  data: () => ({
    drawer: false,
    email: "",
    password: "",
    loading: false
  }),
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    send() {
      this.loading = !this.loading;
      var user = {
        email: this.email,
        password: this.password
      };
      common.login(user).then(res => {
        if (res.data.success == true) {
          localStorage.setItem("token", res.data.token);
          this.loading = false;
          this.$router.push("/event");
        } else {
          this.loading = false;
        }
      });
    },
    goauth() {
      window.location.href = `${process.env.VUE_APP_BASE_URL}auth/google/`;
    },
    githuboauth() {
      window.location.href = `${process.env.VUE_APP_BASE_URL}auth/github/`;
    }
  }
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
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(9px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0px 0px 40px rgb(0, 2, 26);
  border: 0px solid rgb(1, 0, 46);
  border-bottom: 8px solid rgb(161, 183, 255);
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
.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.login-box .user-box {
  position: relative;
}
.fab {
  font-size: 28px !important;
}
.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

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
