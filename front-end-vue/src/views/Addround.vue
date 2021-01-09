<template>
	<v-app id="inspire">
		<span class="bg"></span>
		<Sidenav />
		<v-content>
			<v-container fluid>
				<v-card class="bord">
					<v-container>
						<v-skeleton-loader
							class="mx-auto"
							v-if="loading === true"
							max-width="300"
							type="card"
						></v-skeleton-loader>
						<v-card v-if="loading === false">
							<v-textarea
								name="input-7-4"
								v-model="quesText"
								label="Question text"
								color="success"
								outlined
								auto-grow
							></v-textarea>

							<v-select
								:items="items"
								v-model="quesType"
								label="Question type"
								outlined
								color="success"
							></v-select>
							<v-file-input
								:rules="rules"
								v-model="file"
								v-if="quesType === 'img'"
								show-size
								accept="image/png, image/jpeg, image/bmp"
								color="success"
								placeholder="Pick an image"
								prepend-icon="mdi-camera"
								label="Image"
								filled
							/>
							<v-file-input
								:rules="rules"
								v-model="file"
								v-if="quesType === 'aud'"
								show-size
								color="deep-purple accent-4"
								accept="audio/ogg, audio/mp3, audio/aac"
								placeholder="Pick a audio"
								prepend-icon="mdi-music"
								label="Sound"
								filled
							/>
							<v-text-field
								v-model="options"
								v-if="quesType === 'mcq'"
								label="Options"
								solo
							>
							</v-text-field>
							<v-spacer />
							<v-btn color="blue-grey" class="ma-2 white--text" @click="uploadForm">
								Media
								<v-icon right dark>
									mdi-cloud-upload
								</v-icon>
							</v-btn>

							<v-spacer />
							<v-spacer />
							<v-btn color="blue-grey" class="ma-2 white--text" @click="addQues">
								Question
								<v-icon right dark>
									mdi-plus
								</v-icon>
							</v-btn>
						</v-card>
						<v-spacer />
						<v-spacer />
						<v-spacer />
						<br />
						<!-- <draggable group="people" @start="drag = true" @end="drag = false"> -->
							<v-container v-for="(question, index) in questions" :key="index">
								<Normalques
									:question="question"
									v-if="question[`quesType`] === 'nor'"
								/>
								<Imageques :question="question" v-if="question[`quesType`] === 'img'" />
								<Mcq :question="question" v-if="question[`quesType`] === 'mcq'" />
								<Audio :question="question" v-if="question[`quesType`] === 'aud'" />
							</v-container>
						<!-- </draggable> -->
					</v-container>
				</v-card>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
// import draggable from "vuedraggable";
import axios from "axios";
import Audio from "../components/Audio";
import Normalques from "../components/Normalques";
import Imageques from "../components/Imageques";
import Mcq from "../components/Mcq";
import Sidenav from "../components/layout/Sidenav";
export default {
	components: {
		Sidenav,
		Audio,
		// draggable,
		Normalques,
		Imageques,
		Mcq
	},
	data: () => ({
		quesText: "",
		quesLink: "",
		questions: [],
		loading: false,
		file: "",
		items: ["mcq", "img", "aud", "nor"],
		quesType: "",
		options: "",
		rules: [
			value =>
				!value || value.size < 2000000 || "Avatar size should be less than 2 MB!"
		]
	}),
	methods: {
		addQues() {
			this.questions.push({
				quesText: this.quesText,
				quesLink: this.quesLink,
				quesType: this.quesType,
				options: this.options
			});
			this.quesText = "";
			this.quesLink = "";
			this.quesType = "";
			this.options = "";
		},
		removeTodo(index) {
			this.questions.splice(index, 1);
		},
		async uploadForm() {
			this.loading = true;
			const formdata = new FormData();
			formdata.append("file", this.file, this.file.name);
			await axios.post("http://localhost:3000/upload", formdata).then(res => {
				console.log(res.data);
				this.quesLink = res.data.link;
				this.loading = false;
			});
		}
	},
	mounted() {
		console.log("App mounted!");
		if (localStorage.getItem("questions"))
			this.questions = JSON.parse(localStorage.getItem("questions"));
		else localStorage.removeItem("questions");
	},
	created() {
		this.$vuetify.theme.dark = true;
	},
	watch: {
		questions: {
			handler() {
				console.log("Questions changed!");
				localStorage.setItem("questions", JSON.stringify(this.questions));
			},
			deep: true
		},
		file: {
			handler() {
				console.log(this.file);
			}
		}
	}
};
</script>

<style scoped></style>

<style scoped>
/* .bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: url("../assets/img/f.gif") no-repeat center center;
	background-size: cover;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0.4;
} */
/* 
.bord {
	border-left: 5px solid rgb(136, 255, 0) !important;
	background-color: transparent !important;
	box-shadow: -3px 0px 3px 0px rgb(6, 223, 6) !important;
} */
</style>
