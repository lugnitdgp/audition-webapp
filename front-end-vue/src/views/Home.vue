<template>
  <div id="app">
    
    <span class="bg"></span>

      <v-content>
        <div class="nav-wrap">
        <Sidenav />
        </div>
        <div class="home-wrap">
          <div class="home-card">
        <div class="head-wrap">
            <h1 class="glitch" >
              WELCOME
            </h1>
            <h4 class="glitch">
            TO GLUG AUDITION
            </h4>
        </div>
        <v-container class="mt-5">
          <v-row
            align="center"
            justify="center"
            class="btns"
          >
            
              <router-link tag="span" to="/StLog">
            
              <div class="button fire">LOGIN</div>
    
              </router-link>
            
            
              <router-link tag="span" to="/StSign">
              <div class="button ice">REGISTER</div>
              </router-link>
            
          </v-row>
        </v-container>
        </div>
        </div>
      </v-content>

    
  </div>
</template>

<script>
import Sidenav from "../components/layout/Sidenav";
export default {
  components: {
    Sidenav,
  },
  data: () => ({
    drawer: false,
  }),
  props: {
    source: String,
  },
  beforeCreate() {
    var token = this.$route.query.token
	console.log(token);
	if(token){
		token = 'Bearer '+token;
		localStorage.setItem("token",token)
		this.$router.push("/Stlanding")
	}
  },
  created() {
		this.$vuetify.theme.dark = true;
	},
};
</script>

<style scoped>
#app {
  height: 100vh;
  
}
.btns span{
  padding: 30px 20px;
}
.nav-wrap{
 height: 10vh;
}
.home-wrap{
  height: 90vh;
  width: 100vw;
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.head-wrap{
  width: 100%;
  text-align: center;
}
.home-card{
  width: 90%;
  max-width: 700px;
  padding: 80px 30px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 0px 0px 40px rgb(0, 2, 26);
  border: 0.5px solid rgb(1, 0, 46);
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
  font-family: 'Audiowide', cursive;
  font-size: 2.5rem;
  font-weight: 400;
  text-transform: uppercase;
  position: relative;

  text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);

  animation: glitch 500ms infinite;
}

@media only screen and (max-width: 700px){
  .glitch {
    font-size: 1.8rem;
  }
  .home-card{
  width: 90%;
  max-width: 700px;
  padding: 40px 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 0px 0px 40px rgb(0, 2, 26);
  border: 0.5px solid rgb(1, 0, 46);
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
  border: 1px solid green;
  -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
  transform: skewX(-10deg);
  height: 50px;
  width: 200px;
  border-radius: 20px 5px 20px 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font: 15px sans-serif;
  font-weight: 300;
  text-shadow: 0 0 20px #fff;
  text-transform: uppercase;
  -webkit-animation: breath2 2s 0.5s infinite alternate;
          animation: breath2 2s 0.5s infinite alternate;
  transition: all 0.2s ease;
  cursor: pointer;
}
.button:before {
  content: "";
  display: block;
  width: calc(100% - 22px);
  height: calc(50px - 8px);
  -webkit-animation: breath 2s infinite alternate;
          animation: breath 2s infinite alternate;
  left: 10px;
  top: 3px;
  position: absolute;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 15px 3px 15px 3px;
}
.button.fire {
  border-color: #ffa8ec;
  background-image: linear-gradient(to bottom, rgba(255, 48, 127, 0.6), rgba(240, 29, 159, 0.6));
  box-shadow: 0 0 70px rgba(255, 48, 176, 0.6), 0 5px 20px rgba(255, 48, 186, 0.6), inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
  color: #ffa8e9;
}
.button.fire:before {
  box-shadow: inset 0 0 30px 0 #ffa8ec;
}
.button.ice {
  border-color: #a8ecff;
  background-image: linear-gradient(to bottom, rgba(48, 138, 255, 0.5), rgba(29, 96, 240, 0.5));
  box-shadow: 0 0 70px rgba(48, 138, 255, 0.5), 0 5px 20px rgba(48, 138, 255, 0.5), inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
  color: #a8ecff;
}
.button.ice:before {
  box-shadow: inset 0 0 30px 0 #a8ecff;
}
.button:hover.fire {
  box-shadow: 0 0 70px rgba(255, 48, 169, 0.8), 0 5px 20px rgba(255, 48, 203, 0.8), inset 0 1px #ffa8e5, inset 0 -1px #ffa8ec;
}
.button:hover.fire:before {
  box-shadow: inset 0 0 50px 0 #ffa8e2;
}
.button:hover.ice {
  box-shadow: 0 0 70px rgba(48, 138, 255, 0.8), 0 5px 20px rgba(48, 138, 255, 0.8), inset 0 1px #a8ecff, inset 0 -1px #a8ecff;
}
.button:hover.ice:before {
  box-shadow: inset 0 0 50px 0 #a8ecff;
}
.button + .button {
  margin-top: 15px;
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}

@-webkit-keyframes breath {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0.95);
  }
}

@keyframes breath {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0.95);
  }
}
@-webkit-keyframes breath2 {
  0% {
    transform: skewX(-10deg) scaleX(1);
  }
  100% {
    transform: skewX(-10deg) scaleX(0.95);
  }
}
@keyframes breath2 {
  0% {
    transform: skewX(-10deg) scaleX(1);
  }
  100% {
    transform: skewX(-10deg) scaleX(0.95);
  }
}
</style>
