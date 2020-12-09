<template>
	<v-container fluid>
		
			<v-card outlined shaped tile>
				<v-card-text>
					{{question.quesText}}
				</v-card-text>
                <v-card class="mx-auto" max-width="344">
				<v-img
					:src= "question.quesLink"
				></v-img>
                <v-spacer />
			<v-spacer />
			</v-card>
			</v-card>
			<v-textarea name="input-7-4" filled label="Answers" auto-grow></v-textarea>
		
	</v-container>
</template>

<script>
export default {
	name: "Imageques",
	props: ['question'],
};
</script>
