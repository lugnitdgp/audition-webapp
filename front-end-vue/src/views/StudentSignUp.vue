<template>
	<v-app id="inspire">
		<v-content>
			<Sidenav />

			<Particle />

			<v-container fluid class="centered">
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar color="" dark flat>
								<v-spacer></v-spacer>
								<v-toolbar-title> STUDENT SIGNUP </v-toolbar-title>
								<v-spacer />
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										v-model="UserName"
										label="Full Name"
										name="UserName"
										prepend-icon="person"
										type="text"
									/>

									<v-text-field
										v-model="email"
										label="E-mail"
										name="email"
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
									/>
								</v-form>
							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-container align="center">
									<v-row align="center" justify="center">
										<v-col cols="12">
											<v-btn @click="signup" color="lime accent-4"  block 
												>Sign Up</v-btn
											>
										</v-col>
									</v-row>
										<v-row align="center" justify="center">
										<v-col cols="6">
											<v-btn @click="goauth" color="red darken-2"  block>
												<v-img dark left src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/357916981530077752-512.png" max-height="30" max-width="30"></v-img> SIGN UP 
											</v-btn>
										</v-col>
										<v-col cols="6">
											<v-btn @click="fboauth" color="blue accent-4"  block>
												<v-img dark left src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png" max-height="50" max-width="50"></v-img>  SIGN UP 
											</v-btn>
										</v-col>
										<v-spacer/>
										<p class="subtitle-1" align="center">Already have account  <a @click="$router.push('/StLog')">Login</a></p>
									</v-row>
								</v-container>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
/* eslint-disable */
import common from "@/services/common.js";
import Particle from "../components/layout/Particle";
import Sidenav from "../components/layout/Sidenav";

import axios from "axios";

export default {
	components: {
		Particle,
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
			window.location.href = `${process.env.VUE_APP_BASE_URL}/auth/google/`;
		},
		fboauth() {
			window.location.href = `${process.env.VUE_APP_BASE_URL}/auth/facebook/`;
		}
	}
};
</script>

<style scoped>
.centered {
	color: #ffffff;
	position: absolute;
	text-align: center;
	top: 20%;
	width: 100%;
}

</style>
