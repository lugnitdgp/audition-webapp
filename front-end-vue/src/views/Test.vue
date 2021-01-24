<template>
  <div>
    <video
      src="https://video.wixstatic.com/video/b0567a_9aed8193b5b742d5ac48c51a8e5f9f4e/1080p/mp4/file.mp4"
      autoplay
      loop
      playsinline
      muted
    ></video>
	<v-card class="mx-auto overflow-hidden nav-bar">
		<v-app-bar class="nav-bar" fixed>
			<v-app-bar-nav-icon @click="drawer = true" class="app-icon"></v-app-bar-nav-icon>
		</v-app-bar>
	</v-card>
	<v-navigation-drawer v-model="drawer" absolute temporary class="nav-drawer"  >
		<v-list nav dense>
			<v-list-item-group
				v-model="group"
				active-class="deep-purple--text text--lighten-2"
			>
				<v-btn @click="logout" color="#B2EBF2"><span style="color: #000 !important;">Logout</span></v-btn>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
    <v-container class="question-cont">

			<v-card>
				<v-tabs
					v-model="tab"
					background-color="#202f46"
					next-icon="mdi-arrow-right-bold-box-outline"
					prev-icon="mdi-arrow-left-bold-box-outline"
					show-arrows
				>
					<v-tabs-slider color="cyan"></v-tabs-slider>

					<v-tab href="#ques1">
						QUES-1
					</v-tab>

					<v-tab href="#ques2">
						QUES-2
					</v-tab>
					<v-tab href="#ques3">
						QUES-3
					</v-tab>

					<v-tab href="#ques4">
						QUES-4
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item :key="1" value="ques1">
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
					</v-tab-item>
					<v-tab-item :key="2" value="ques2">
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
					</v-tab-item>
					<v-tab-item :key="1" value="ques3">
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
					</v-tab-item>
					<v-tab-item :key="2" value="ques4">
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
					</v-tab-item>
				</v-tabs-items>
			</v-card>
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
    file: "",
    drawer: false,
    group: null,
    tab: "subscribe"
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
video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.nav-bar {
  background-color: transparent !important;
  background: transparent !important;
  border: none;
  color: white;
}
.question-cont {
  margin-top: 11rem;
  margin-bottom: 11rem;
}
#text {
  color: #b2ebf2 !important;
  text-align: center !important;
  font-size: 1.3rem;
  font-weight: 700;
}
v-img {
  text-align: center !important;
}
@media only screen and (max-width: 1264px) and (min-width: 992px) {
	#text {  
		font-size: 1.1rem;	
	}
	.question-cont {
		margin-bottom: 8rem;
	}
}
@media only screen and (max-width: 992px) and (min-width: 764px) {
	#text {  
		font-size: 1.1rem;	
	}
	.question-cont {
		margin-bottom: 8rem;
	}
}
@media only screen and (max-width: 764px) and (min-width: 576px) {
	#text {  
		font-size: 1rem;	
	}
	.question-cont {
		margin-top: 9rem;
		margin-bottom: 8rem;
	}
}
@media only screen and (max-width: 576px) {
  #text {
    font-size: 0.9rem;
  }
  .question-cont {
    height: 100vh;
    margin-top: 3rem;
  }
} 
</style>
