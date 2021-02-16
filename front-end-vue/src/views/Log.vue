<template>
  <div>
    <p v-for="message in messages.slice().reverse()" :key="message">
      {{ message }}
    </p>
  </div>
</template>
 
<script>
// We store the reference to the SSE object out here
// so we can access it from other methods
//let msgServer;

export default {
  name: "sse-test",
  data() {
    return {
      messages: [],
    };
  },
  created() {
    let es = new EventSource(`${process.env.VUE_APP_BASE_URL}events`);
    console.log(es);
    es.onmessage = (event) => {
      console.log(event.data);
      console.log(JSON.parse(event.data));
    };
  },
};
</script> 