<template>
	<div>
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
				<v-card-text class="justify-center" id="text">
					{{ question.quesText }}
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
	props: ["question"]
};
</script>

<style scoped>
#text {
	color: aquamarine !important;
	text-align: center !important;
	font-size: 1rem;
	font-weight: 700;
}
</style>
