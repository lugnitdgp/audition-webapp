<template>
	<div id="app">
		<span class="bg"></span>
		<v-app id="inspire">
			<template>
				<v-container>
					<v-card>
						<v-card>
							<v-tabs dark background-color="teal darken-3" show-arrows v-model="tab">
								<v-tabs-slider color="teal lighten-3"></v-tabs-slider>

								<v-tab v-for="i in round" :key="i"> Round {{ i }} </v-tab>
							</v-tabs>
							<v-tabs-items v-model="tab">
								<v-tab-item v-for="i in round" :key="i">
									<v-container>
										<v-data-table
											:headers="headers"
											hide-default-footer
											:items="items"
											class="elevation-1"
										>
											<template v-slot:item="row">
												<tr v-show="row.item.round >= tab + 1">
													<td>{{ row.item.name }}</td>
													<td>{{ row.item.status }}</td>

													<td>{{ row.item.role }}</td>

													<td>
														<v-dialog v-model="dialog" persistent max-width="600px">
															<template v-slot:activator="{ on, attrs }">
																<v-btn  class="mx-2" light small v-bind="attrs" v-on="on">
																	SET ROLE
																</v-btn>
															</template>
															<v-card>
																<v-card-title>
																	<span class="headline">CHANGE ROLE</span>
																</v-card-title>
																<v-card-text>
																	<v-container>
																		<v-row>
																			<v-col cols="12" sm="6">
																				<v-select
																					v-model="role"
																					:items="['su', 'm' , 's']"
																					label="ROLE"
																					
																				></v-select>
																			</v-col>
																			<v-col
																		cols="12"
																		sm="6"
																		md="4"
																	>
																		<v-text-field
																		v-show="role === 'm'"
																		v-model="clearance"
																		label="Set clearence of members"
																		
																		></v-text-field>
																	</v-col>
																		</v-row>
																	</v-container>
																	
																</v-card-text>
																<v-card-actions>
																	<v-spacer></v-spacer>
																	<v-btn color="blue darken-1" text @click="dialog = false">
																		Close
																	</v-btn>
																	<v-btn color="blue darken-1" text @click="changeRole(router.item.uid)">
																		Save
																	</v-btn>
																</v-card-actions>
															</v-card>
														</v-dialog>
													</td>
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
		</v-app>
	</div>
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
			adminUser: "",
			items: [],
			expand: false,
			darkmode: false,
			round: null,
			dialog: false,
			role: "",
			clearance : 0,

			headers: [
				{ text: "FULL NAME", align: "start", value: "name" },
				{ text: "STATUS", align: "start", value: "status" },
				{ text: "CURRENT ROLE", align: "start", value: "details" },
				{ text: "CHANGE ROLE", align: "start", value: "role" }
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
		changeStatus() {
				this.details.role = this.role;
				console.log(this.role)
				this.changeRole();
			
		},
		changeRole(id) {
			var a = {
				_id : id ,
				role : this.role
			};
			common.changeRole(a).then(() => {
				if(this.role === 'm'){
					var b = {
				_id : id,
				clearance : this.clearance

			};
			common.setClearance(b).then(res =>{
				alert(res.data)
			})
				}
			});
		},

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
