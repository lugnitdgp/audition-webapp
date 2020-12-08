<template>
	<div>
		<v-container fluid>
				<v-card outlined shaped tile>
					<v-card-text>
						"Turns out semicolon-less style is easier and safer in TS because most
						gotcha edge cases are type invalid as well." "Turns out semicolon-less
						style is easier and safer in TS because most gotcha edge cases are type
						invalid as well." "Turns out semicolon-less style is easier and safer in
						TS because most gotcha edge cases are type invalid as well." "Turns out
						semicolon-less style is easier and safer in TS because most gotcha edge
						cases are type invalid as well."
					</v-card-text>
				</v-card>
			
				<v-card class="mx-auto my-12" max-width="374">
					<vuetify-audio
						file="http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3"
						color="success"
						:ended="audioFinish"
						downloadable
					></vuetify-audio>
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
	components: {
		VuetifyAudio: () => import("vuetify-audio")
	},
	data: () => ({
		file: ""
	})
};
</script>
