<template>
	<div>
		
	<v-container fluid>
			<v-card class="bord" color="#141d2b">
				<v-card-text class="justify-center" id="text">
						{{question.quesText}}
				</v-card-text>
				<v-layout class="justify-center">
					<v-flex xs12 sm6 lg3>
						<v-card align-center color="#121a26">
							<v-container fluid>
								<vuetify-audio
									:file="question.quesLink"
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
	</div>
</template>

<script>
export default {
	name: "Audio",
	props: ['question'],

	components: {
		VuetifyAudio: () =>
			import ("vuetify-audio")
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
