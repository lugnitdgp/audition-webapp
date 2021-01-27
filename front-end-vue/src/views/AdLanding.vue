<template>
	<v-app>
		<v-content>
			<v-card class="mx-auto overflow-hidden">
				<v-app-bar>
					<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

					<!-- <v-toolbar-title>GLUG AUDITIONS 2020</v-toolbar-title> -->
					<v-spacer></v-spacer>

					<v-btn @click="logout" color="#B2EBF2" right
						><span style="color: #000 !important;">Logout</span></v-btn
					>
					<!-- <v-btn @click="purge" color="light-blue darken-1">PURGE</v-btn> -->
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
						<v-alert outlined color="#00FFFF">
							<h1 class="text-center">STUDENTS DASHBOARD</h1>
						</v-alert>
					</v-spacer>
				</div>
				<v-spacer />
				<v-spacer />
				<v-container absolute fluid>
					<v-row align="center" justify="center">
						<v-col cols="12" sm="6" lg="3">
							<v-alert outlined color="#00FFFF">
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
							</v-alert>
						</v-col>
						<v-col cols="12" sm="6" lg="3">
							<v-alert outlined color="success">
								<v-list-item three-line>
									<v-list-item-content>
										<div class="subtitle-2">COMPLETED</div>
										<v-list-item-title class="display-2">
											{{ completed.length }}
										</v-list-item-title>
										<v-list-item-subtitle></v-list-item-subtitle>
									</v-list-item-content>

									<v-list-item-avatar tile size="90">
										<v-img src="../assets/img/t.png"></v-img>
									</v-list-item-avatar>
								</v-list-item>
							</v-alert>
						</v-col>
						<v-col cols="12" sm="6" lg="3">
							<v-alert outlined color="warning">
								<v-list-item three-line>
									<v-list-item-content>
										<div class="subtitle-2">PENDING</div>
										<v-list-item-title class="display-2">
											{{ items.length - completed.length }}
										</v-list-item-title>
									</v-list-item-content>

									<v-list-item-avatar tile size="90">
										<v-img src="../assets/img/w.png"></v-img>
									</v-list-item-avatar>
								</v-list-item>
							</v-alert>
						</v-col>
					</v-row>
				</v-container>
				<template>
					<v-container>
						<v-card>
							<v-card>
								<v-text-field
									v-model="search"
									append-icon="mdi-magnify"
									label="Search"
									hide-details
								></v-text-field>
								<v-tabs dark background-color="teal darken-3" show-arrows v-model="tab">
									<v-tabs-slider color="teal lighten-3"></v-tabs-slider>

									<v-tab v-for="i in round" :key="i"> Round {{ i }} </v-tab>
								</v-tabs>
								<v-tabs-items v-model="tab">
									<v-tab-item v-for="i in round" :key="i">
										<v-container v-if="i < round">
										
										<v-data-table
										:headers="headers"
										hide-default-footer
										:items="items"
										:search="search"
										class="elevation-1"
										>
										<template v-slot:item="row">
											<tr v-show="row.item.round >= tab + 1" >
												<td>{{ row.item.name }}</td>
												<td>{{ row.item.status }}</td>
												
												<td>{{ row.item.lastUser }}</td>
											
												<!-- <td>
													<v-btn class="mx-2" light small @click="usercontrol(row.item)"
														>Detail</v-btn
													>
												</td> -->
											</tr>
											
										</template>
									</v-data-table>
										</v-container>
									<v-container v-if="i === round ">
										
										<v-data-table
										:headers="headers"
										hide-default-footer
										:items="items"
										:search="search"
										class="elevation-1"
										>
										<template v-slot:item="row">
											<tr v-show="row.item.round >= tab + 1" @click="usercontrol(row.item)">
												<td>{{ row.item.name }}</td>
												<td>{{ row.item.status }}</td>
												
												<td>{{ row.item.lastUser }}</td>
											
												<!-- <td>
													<v-btn class="mx-2" light small @click="usercontrol(row.item)"
														>Detail</v-btn
													>
												</td> -->
											</tr>
											
										</template>
									</v-data-table>
										</v-container>
									</v-tab-item>
								</v-tabs-items>
							</v-card>
						</v-card>
					</v-container>
				</template>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";
export default {
	name: "Landing",
	components: {},

	data() {
		return {
			drawer: false,
			search: "",
			adminUser: "",
			items: [],
			completed: [],
			expand: false,
			darkmode: false,
			round: null,
			headers: [
				{ text: "FULL NAME", align: "start", value: "name" },
				{ text: "STATUS", align: "start", value: "status" },

				{ text: "LAST VIEWED", align: "start", value: "details" },
				// { text: "DETAILS", align: "start", value: "details" }
			],
			tab: null,
			rounds: ["web", "shopping", "videos", "images", "news"]
		};
	},

	created() {
		this.adminUser = VueJwtDecode.decode(
			localStorage.getItem("token").substring(6)
		).UserName;

		console.log(this.adminUser);
		common.getAuditionStatus().then(res => {
			console.log(res);
			this.round = res.data.round;
		});
		common.getUsers().then(res => {
			if (res.status === 200) {
				console.log(res.data);
				this.items = res.data.doc;
				this.items = this.items.filter(item => item.role === 's')
				this.completed = this.items.filter(item => ((item.status === 'selected') || (item.status === 'rejected')))
			} else if (res.status === 401) {
				alert("UNAUTHORISED ACCESS");
				localStorage.clear("token");
				this.$router.push("/");
			} else {
				alert("No data");
			}
		});

		this.$vuetify.theme.dark = true;
	},
	beforeCreate() {
		console.log(localStorage.getItem("token"));
		if (localStorage.getItem("token") === null) {
			this.$router.push("/");
		} else if (
			VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role === "s"
		) {
			this.$router.push("/");
		}
	},
	methods: {
		logout() {
			common.logout().then(res => {
				localStorage.clear();
				alert(res.data);
				this.$router.push("/AdLog");
			});
		},
		usercontrol(a) {
			var payload = a;
			payload["lastUser"] = this.adminUser;
			console.log(this.adminUser);
			common.updateEntry(payload);
			let routeData = this.$router.resolve({
				name: "UserControl",
				query: { id: a._id }
			});
			window.open(routeData.href, "_blank");
		},
		purge() {
			common.purge().then(res => {
				alert(res.data.message);
				location.reload();
			});
		}
	},
	watch: {
		tab: {
			handler() {
				console.log(this.tab);
				
			},
			deep: true
		},
		darkmode(newvalue) {
			this.$vuetify.theme.dark = newvalue;
		}
	}
};
</script>
