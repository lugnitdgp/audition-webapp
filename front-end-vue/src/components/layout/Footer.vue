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
  border-top: 2px solid rgb(53, 30, 255);
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  height: 45px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>