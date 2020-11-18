<template>
<div>
     <vue-particles
        color="#00FF33"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#00FF33"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
</div>
</template>



<style scoped>
#particles-js{
  
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  top: 0;
}
</style>