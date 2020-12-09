<template>
	<div>
		<v-container fluid>
			<v-card outlined shaped tile>
				<v-card-text>
					{{question.quesText}}
				</v-card-text>
			</v-card>
	
			<v-card class="mx-auto my-12" max-width="374">
				<vuetify-audio file="question.quesLink" color="success" :ended="audioFinish" downloadable></vuetify-audio>
			</v-card>
	
			<v-spacer />
			<v-spacer />
			<v-textarea name="input-7-4" filled label="Answers" auto-grow></v-textarea>
	
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
