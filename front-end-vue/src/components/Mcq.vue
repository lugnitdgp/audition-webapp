<template>
	<div>
		<v-container fluid>
			<v-card class="bord" color="#141d2b">
				<v-card-text class="justify-center" id="text">
					{{ question.quesText }}
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
												:label="`${n}`"
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
	</div>
</template>

<script>
export default {
	props: ["question"],
	data() {
		return {
			radioGroup: ""
		};
	}
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
