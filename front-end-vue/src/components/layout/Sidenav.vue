<template>
	<div>
		<v-card class="mx-auto overflow-hidden">
			<v-app-bar>
				<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

				<v-toolbar-title>GLUG AUDITIONS 2020</v-toolbar-title>
			</v-app-bar>
		</v-card>

		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-list nav dense>
				<v-list-item-group
					v-model="group"
					active-class="deep-purple--text text--lighten-2"
				>
					<router-link tag="span" to="/">
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Home</v-list-item-title>
						</v-list-item>
					</router-link>
					<router-link tag="span" to="/StSign">
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-account</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Student SignUp</v-list-item-title>
						</v-list-item>
					</router-link>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	name: "Sidenav",
	data: () => ({
		drawer: false,
		var1: "red darken-4"
	})
};
</script>
