<template>
	<v-app id="inspire">
		<v-content>
			<span class="bg"></span>
			<Sidenav />
			<div class="login-box">
				<h2>REGISTER</h2>
				<v-form class="elevation-24">
					<v-text-field
						v-model="UserName"
						label="Full Name"
						name="UserName"
						prepend-icon="person"
						type="text"
						class="user-box"
					/>
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
						class="user-box"
					/>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions>
					<v-container align="center">
						<v-row align="center" justify="center">
							<v-col cols="12">
						
								<v-btn
								block
								outlined
								color="cyan"
								@click="signup" 
								>
								REGISTER
								</v-btn>
							</v-col>
						</v-row>
						<v-row align="center" justify="center">
							<v-col cols="3" align="center" justify="center">
								<v-btn color="red" outlined fab large @click="goauth">
									<v-icon>mdi-google</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="3" align="center" justify="center">
								<v-btn color="blue" outlined fab large @click="githuboauth">
									<i class="fab fa-github"></i>
								</v-btn>
							</v-col>	
						</v-row>
						<v-row
							class="mt-4"
							align="center"
							justify="center"
						>
							<p align="center">Already have an account ? <a @click="$router.push('/StLog')" style="color: cyan !important;">Login</a></p>
						</v-row>
						
					</v-container>
				</v-card-actions>
				

								

			</div>
		</v-content>
	</v-app>
</template>

<script>
/* eslint-disable */
import common from "@/services/common.js";
import Sidenav from "../components/layout/Sidenav";

import axios from "axios";

export default {
	components: {
		Sidenav
	},
	data: () => ({
		drawer: false,
		UserName: "",
		email: "",
		password: ""
	}),
	props: {
		source: String
	},
	created() {
		localStorage.clear();
		this.$vuetify.theme.dark = true;
	},
	methods: {
		signup() {
			const user = {
				UserName: this.UserName,
				email: this.email,
				password: this.password,
				isAdmin: false
			};

			common.signup(user).then(res => {
				alert(res.data.message);
				if (res.data.success == true) {
					this.$router.push("/StLog");
				} else {
					this.$router.push("/StSign");
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
  filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
}
.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 400px;
	padding: 40px;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.5);
	box-sizing: border-box;
	box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
	border-radius: 10px;
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

</style>
