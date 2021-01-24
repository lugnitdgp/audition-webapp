<template>
	<v-container>
		<v-container fluid class="question" ref="question1">
			<v-card class="bord" color="#202f46">
				<v-card-text class="justify-center" id="text">
					There are many variations of passages of Lorem Ipsum available, but the
					majority have suffered alteration in some form, by injected humour, or
					randomised words which don't look even slightly believable. If you are
					going to use a passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text. All the Lorem Ipsum
					generators on the Internet tend to repeat predefined chunks as necessary
				</v-card-text>
				<v-layout class="justify-center">
					<v-flex xs12 sm6 lg3>
						<v-card align-center class="mx-3 mb-5">
							<v-container grid-list-sm fluid>
								<v-layout row wrap>
									<v-img
										width="300"
										heiht="300"
										src="https://tryhackme.com/img/illustrations/TryHackMe_OSCP.png"
									>
									</v-img>
								</v-layout>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-card>
			<v-spacer />
			<v-spacer />
			<v-textarea
				filled
				name="input-7-4"
				label="Answers"
				auto-grow
				color="#00FFBF"
				class="text"
			></v-textarea>
		</v-container>
		<v-container fluid class="question" ref="question2">
			<v-card class="bord" color="#202f46">
				<v-card-text class="justify-center" id="text">
					There are many variations of passages of Lorem Ipsum available, but the
					majority have suffered alteration in some form, by injected humour, or
					randomised words which don't look even slightly believable. If you are
					going to use a passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text. All the Lorem Ipsum
					generators on the Internet tend to repeat predefined chunks as necessary
				</v-card-text>
				<v-layout class="justify-center">
					<v-flex xs12 sm6 lg3>
						<v-card align-center color="#121a26" class="mx-3 mb-5">
							<v-container fluid>
								<vuetify-audio
									file="http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3"
									color="#00FFBF"
									:ended="audioFinish"
								></vuetify-audio>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-card>
			<v-spacer />
			<v-spacer />
			<v-textarea
				filled
				name="input-7-4"
				label="Answers"
				auto-grow
				color="#00FFBF"
				class="text"
			></v-textarea>
		</v-container>
		<v-container fluid class="question">
			<v-card class="bord" color="#202f46">
				<v-card-text class="justify-center" id="text">
					There are many variations of passages of Lorem Ipsum available, but the
					majority have suffered alteration in some form, by injected humour, or
					randomised words which don't look even slightly believable. If you are
					going to use a passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text. All the Lorem Ipsum
					generators on the Internet tend to repeat predefined chunks as necessary
				</v-card-text>
				<v-layout>
					<v-flex xs12>
						<v-card align-center>
							<v-container fluid>
								<template>
									<v-container fluid>
										<v-radio-group v-model="radioGroup">
											<v-radio
												v-for="n in 4"
												:key="n"
												:label="`Radio ${n}`"
												:value="n"
												color="#00FFBF"
											></v-radio>
										</v-radio-group>
									</v-container>
								</template>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-card>
		</v-container>
		<v-container fluid class="question">
			<v-card class="bord" color="#202f46">
				<v-card-text class="justify-center" id="text">
					There are many variations of passages of Lorem Ipsum available, but the
					majority have suffered alteration in some form, by injected humour, or
					randomised words which don't look even slightly believable. If you are
					going to use a passage of Lorem Ipsum, you need to be sure there isn't
					anything embarrassing hidden in the middle of text. All the Lorem Ipsum
					generators on the Internet tend to repeat predefined chunks as necessary
				</v-card-text>
			</v-card>
			<v-spacer />
			<v-spacer />
			<v-textarea
				filled
				name="input-7-4"
				label="Answers"
				auto-grow
				color="#00FFBF"
				class="text"
			></v-textarea>
		</v-container>
	</v-container>
</template>

<script>
export default {
	name: "Normalques",
	components: {
		VuetifyAudio: () => import("vuetify-audio")
	},
	data: () => ({
		file: "",
		drawer: false,
		group: null
	}),
	watch: {
		group() {
			this.drawer = false;
		}
	},
	methods: {
		goto(refName) {
			var element = this.$refs[refName];
			var top = element.offsetTop - 100;

			window.scrollTo(0, top);
		}
	}
};
</script>

<style scoped>
#text {
	color: #b2ebf2 !important;
	text-align: center !important;
	font-size: 1rem;
	font-weight: 700;
}
v-img {
	text-align: center !important;
}
@media only screen and (max-width: 576px) {
	#text {
		font-size: 0.9rem;
	}
}
</style>
