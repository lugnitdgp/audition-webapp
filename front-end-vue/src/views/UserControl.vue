<template>
	<v-app>
		<v-toolbar color="#141d2b" flat>
			<v-spacer />
			<v-spacer />
			<v-spacer />
			<v-row justify="center">
				<v-dialog v-model="dialog" persistent max-width="290">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="error" dark v-bind="attrs" v-on="on">
							Finalise
						</v-btn>
					</template>
					<v-card>
						<v-card-title class="headline">
							Are You Sure ?
						</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="red darken-1" text @click="dialog = false">
								NO
							</v-btn>
							<v-btn color="green darken-1" text @click="finalise">
								YES
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-row>
		</v-toolbar>
		<v-spacer />
		<v-spacer />

		<v-container fluid>
			<v-alert text color="info"  icon="mdi-school">
				<h4 class="headline" color="#9fef00">
					<strong>
						WELCOME TO THE DETAILS OF  {{ details.name.toUpperCase() }}
					</strong>
				</h4>
			</v-alert>
		</v-container>
		<v-container fluid>
			<v-row>
				<v-col md="6">
					<v-card>
						<v-toolbar color="info" dark flat>
							<v-toolbar-title color="info">Answers across all rounds</v-toolbar-title>

							<template v-slot:extension>
								<v-tabs v-model="tab" align-with-title color="#9fef00">
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
				<v-col md="6">
					<div>
						<v-alert dense outlined type="error">
							<v-row align="center">
								<v-col>
									Current Round : {{ details.round }} Current selection status :
									{{ details.selected.status }} by
									<strong>{{ details.selected.user }}</strong>
								</v-col>
								<v-col class="shrink">
									<v-btn
										:disabled="details.final.status"
										@click="selectionstatus"
										color="black"
										>Change Selection Status</v-btn
									>
								</v-col>
							</v-row>
						</v-alert>
						<v-container fluid class="fill-height">
							<v-row align="center" justify="center">
								<v-col>
									<v-card class="elevation-12">
										<v-toolbar color="primary" dark flat>
											<v-spacer></v-spacer>
											<v-toolbar-title> Your Feedback </v-toolbar-title>
											<v-spacer />
										</v-toolbar>
										<v-spacer />
										<v-card-text>
											<v-textarea
												v-model="feedback"
												label="YOUR feedback"
												name="feedback"
												outlined
												type="text"
											></v-textarea>
										</v-card-text>
										<v-card-actions>
											<v-spacer />
											<v-btn @click="submitFeedback" color="teal darken-3"
												>Post your feedback</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
							<v-container fluid>
								<v-data-iterator
									:items="details.feedback"
									item-key="_id"
									:single-expand="expand"
								>
									<template v-slot:header>
										<v-alert text outlined color="orange" icon="mdi-fire">
										FEEDBACK
										</v-alert>
									</template>
									<template v-slot:default="{ items }">
										<v-row>
											<v-col
												v-for="item in items"
												:key="item._id"
												cols="40"
												sm="12"
												lg="6"
											>
												<v-card>
													<v-card-title>
														<h5> 	{{ item.feedback }}</h5>
													</v-card-title>

													<v-divider class="mx-4"></v-divider>
													<!-- <v-list dense>
														<v-container fluid color="deep-purple lighten-2">
														Feed-back by {{ item.user }} in Round {{ item.round }}
														</v-container>
													</v-list> -->
													<v-card-actions>
														<v-btn
														color="#9fef00"
														text
														
														>
														- {{ item.user }}
														</v-btn>
														</v-card-actions>

												</v-card>

											</v-col>
										</v-row>
									</template>
								</v-data-iterator>
							</v-container>
						</v-container>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
import common from "@/services/common.js";

export default {
	name: "Landing",
	data() {
		return {
			adminUser: localStorage.getItem("admin"),
			details: [],
			flag: false,
			feedback: "",
			expand: false,
			type: null,
			dialog: false,
			items: ["ROUND1", "ROUND2"]
		};
	},
	beforeCreate() {
		const a = { id: this.$route.query.id };
		console.log(a);
		if (localStorage.getItem("token") === null) {
			localStorage.clear();
			this.$router.push("/");
		} else {
			common.getUser(a).then(res => {
				if (res.status === 200) {
					this.details = res.data;
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
		selectionstatus() {
			this.details.selected = {
				status: !this.details.selected.status,
				user: this.adminUser
			};
			this.updateEntry();
		},
		finalise() {
			this.details.final = { status: true, user: this.adminUser };
			alert("You've finalised this candidate's audition procedure");
			this.updateEntry();
		},
		updateEntry() {
			var a = this.details;
			common.updateEntry(a).then(res => {
				alert(res.data.message);
			});
		}
	},
	computed: {
		statuss() {
			if (this.details.selected.status === "true") return "green";
			return "red";
		}
	}
};
</script>


