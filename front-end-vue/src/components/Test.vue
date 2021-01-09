<template>
	<div>
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
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
						<v-card align-center>
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
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
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
						<v-card align-center color="#121a26">
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
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
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
						<v-card align-center color="#121a26">
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
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
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
	</div>
</template>

<script>
export default {
	name: "Normalques",
	components: {
		VuetifyAudio: () => import("vuetify-audio")
	},
	data: () => ({
		file: ""
	})
};
</script>

<style scoped>


#text {
	color: aquamarine !important;
	text-align: center !important;
	font-size: 1rem;
	font-weight: 700;
}
v-img {
	text-align: center !important;
}
</style>
