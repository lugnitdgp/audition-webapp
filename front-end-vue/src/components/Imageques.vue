<template>
	<v-container fluid>
			<v-card class="bord" color="#141d2b">
				<v-card-text class="justify-center" id="text">
					{{question.quesText}}
				</v-card-text>
				<v-layout class="justify-center">
					<v-flex xs12 sm6 lg3>
						<v-card align-center>
							<v-container grid-list-sm fluid>
								<v-layout row wrap>
									<v-img
										width="300"
										heiht="300"
										:src= "question.quesLink"
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
</template>

<script>
export default {
	name: "Imageques",
	props: ['question'],
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