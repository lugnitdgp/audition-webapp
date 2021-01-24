<template>
	<div>
		<v-card class="mx-auto overflow-hidden" color="rgb(0, 0, 0, 0.2)">
			<v-app-bar class='elevation-0'  id="nav-bar">
				<v-app-bar-nav-icon @click="drawer = true" class="app-icon"></v-app-bar-nav-icon>

				
			</v-app-bar>
		</v-card>

		<v-navigation-drawer v-model="drawer" absolute temporary class="nav-drawer"  >
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
							<v-list-item-title>Register</v-list-item-title>
						</v-list-item>
					</router-link>
					<router-link tag="span" to="/StLog">
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-login</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Login</v-list-item-title>
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

<style scoped>
.v-list-item {
	cursor: pointer !important;
}

#nav-bar {
  background-color: transparent;
  border: none;
  color: white;
}

</style>