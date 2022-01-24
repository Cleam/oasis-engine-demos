<template>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { initOasis } from './index';
initOasis();
</script>

<style scoped>
#canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
