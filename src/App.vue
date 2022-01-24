<template>
  <div class="loading" v-if="store.loading">loading...</div>
  <D01></D01>
</template>

<script setup lang="ts">
import { useStore } from './store';
import D01 from './components/d01/index.vue';
const store = useStore();
</script>
<style>
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
