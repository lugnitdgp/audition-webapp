<template>
<div id="app">
  <span class="bg"></span>
	<v-app id="inspire">
		<v-content>
			<Sidenav />
		</v-content>
	</v-app>
</div>
</template>

<script>
import Sidenav from "../components/layout/Sidenav";
export default {
	components: {
		Sidenav
	},
	data: () => ({
		drawer: false
	}),
	props: {
		source: String
	}
};
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/img/f.gif') no-repeat center center;
    background-size: cover;
	background-color: rgba(0,0,0,0.5);
	opacity: 0.4;
}


</style>
