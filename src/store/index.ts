import { defineStore, createPinia } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return { loading: true };
  },
});

export const store = createPinia();
