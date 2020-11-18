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
							<v-card-actions>
								<v-spacer />
								<v-container align="center">
									<v-row align="center" justify="center">
										<v-col cols="6">
											<v-btn @click="signup" color="lime accent-4" large block
												>Sign Up</v-btn
											>
										</v-col>
										<v-col cols="6">
											<v-btn
												@click="$router.push('/StLog')"
												color="blue lighten-1"
												large
												block
												>Login</v-btn
											>
										</v-col>
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
import common from '@/services/common.js'
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
