<template>
  <v-card>
    <div class="footer" >
          <strong>Made with ❤️ by GLUG🐧 </strong>
    </div>
  </v-card>
</template>

    <script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgba(19, 1, 1, 0.449);
  backdrop-filter: blur(8px);
  height: 45px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>