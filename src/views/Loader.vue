<template>
  <div class="fade-wrapper" v-if="loader">
    <rotate-square2></rotate-square2>
  </div>
</template>

<script>
import {RotateSquare2} from 'vue-loading-spinner';
export default {
  name: "Loader",
  props: ['loader'],
  components: {

    RotateSquare2
  },
}
</script>

<style scoped>
.fade-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}
</style>
