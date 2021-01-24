<template>
	<v-app>
		<v-container fluid>
			<v-alert outlined color="#00FFFF">
				<h2 class="text-center">
					WELCOME TO THE DETAILS OF {{ details.name.toUpperCase() }}
				</h2>
			</v-alert>
		</v-container>
		<v-container fluid>
			<v-row>
				<v-col md="9">
					<v-card>
						<v-toolbar color="cyan" dark flat>
							<v-toolbar-title color="info">Answers across all rounds</v-toolbar-title>

							<template v-slot:extension>
								<v-tabs v-model="tab" align-with-title color="#B2EBF2">
									<v-tabs-slider color="#9fef00"></v-tabs-slider>

									<v-tab v-for="item in items" :key="item">
										{{ item }}
									</v-tab>
								</v-tabs>
							</template>
						</v-toolbar>

						<v-tabs-items v-model="tab">
							<v-tab-item v-for="item in items" :key="item">
								<v-card flat>
									<v-card-text v-text="text"></v-card-text>
								</v-card>
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</v-col>
				<v-col md="3">
					<div>
						<v-alert outlined color="#00FFFF">
							<div class="title"></div>
							<div>
								<template>
									<v-container fluid>
										<v-select
											:disabled="clearance"
											v-model="status"
											:items="options"
											v-on:change="changeStatus()"
											label="SELECTION STATUS"
											solo
										></v-select>
									</v-container>
								</template>
							</div>
							<template>
								<v-expansion-panels color="#B2EBF2" inset>
									<v-expansion-panel>
										<v-expansion-panel-header>
											SUBMIT FEEDBACK
										</v-expansion-panel-header>
										<v-expansion-panel-content>
											<v-row align="center" justify="center">
												<v-col>
													<v-textarea
														v-model="feedback"
														label="FEEDBACK"
														name="feedback"
														outlined
														color="#00FFFF"
														type="text"
													></v-textarea>

													<v-card-actions>
														<v-spacer />
														<v-btn @click="submitFeedback" color="#00FFFF">SUBMIT</v-btn>
													</v-card-actions>
												</v-col>
											</v-row>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</template>
						</v-alert>
						<v-alert outlined color="#00FFFF">
							<div class="title">
								FEEDBACKS
							</div>

							<div>
								<v-data-iterator
									:items="details.feedback"
									item-key="_id"
									:single-expand="expand"
								>
									<template v-slot:default="{ items }">
										<v-row>
											<v-col v-for="item in items" :key="item._id" cols="40" sm="12">
												<v-alert outlined color="#00FFFF">
													<v-list-item-content>{{ item.feedback }}</v-list-item-content>
													<v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
													<v-list-item-content>
														<v-list-item-title> - {{ item.user }}</v-list-item-title>
													</v-list-item-content>
												</v-alert>
											</v-col>
										</v-row>
									</template>
								</v-data-iterator>
							</div>
						</v-alert>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import common from "@/services/common.js";
import VueJwtDecode from "vue-jwt-decode";

export default {
	name: "Landing",
	data() {
		return {
			adminUser: "",
			details: [],
			flag: false,
			feedback: "",
			expand: false,
			type: null,
			dialog: false,
			items: ["ROUND1", "ROUND2"],
			status: "",
			clearance: true,
			options: ["unevaluated", "selected", "review", "rejected"]
		};
	},
	beforeCreate() {
		const a = { id: this.$route.query.id };
		console.log(a);
		if (localStorage.getItem("token") === null) {
			this.$router.push("/");
		} else if (
			VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role === "s"
		) {
			this.$router.push("/");
		} else {
			console.log(VueJwtDecode.decode(localStorage.getItem("token").substring(6)).clearance)
			common.getUser(a).then(res => {
				if (res.status === 200) {
					this.details = res.data;
					this.status = res.data.status;
					if (
						VueJwtDecode.decode(localStorage.getItem("token").substring(6))
							.clearance >= res.data.round || VueJwtDecode.decode(localStorage.getItem("token").substring(6)).role === "su"
					) {
						this.clearance = false;
					}
					console.log(res);
				} else if (res.status === 401) {
					alert("UNAUTHORISED ACCESS");
					localStorage.clear("token");
					this.$router.push("/");
				} else {
					alert("No data");
				}
			});
		}
	},
	created() {
		this.adminUser = VueJwtDecode.decode(localStorage.getItem("token").substring(6)).UserName;
	},
	methods: {
		submitFeedback() {
			const a = {
				feedback: this.feedback,
				user: this.adminUser,
				round: this.details.round
			};
			this.details.feedback.push(a);
			this.updateEntry();
		},
		changeStatus() {
			if (this.status != "unevaluated") {
				this.details.status = this.status;
				this.updateEntry();
			}
		},
		updateEntry() {
			var a = this.details;
			common.updateEntry(a).then(res => {
				alert(res.data.message);
			});
		}
	}
};
</script>
