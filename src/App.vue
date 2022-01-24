<template>
  <div class="loading" v-if="store.loading">loading...</div>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { useStore } from './store';
import { initOasis } from './oasis/d1';
const store = useStore();
initOasis();
</script>
<style>
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
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
</style>
