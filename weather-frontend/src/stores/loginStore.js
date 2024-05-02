import { defineStore } from 'pinia';

export const loginStore = defineStore('isLogged', {
  state: () => ({
    isLogged: false,
  }),
  getters: {

  },
  actions: {
    login() {
      this.isLogged = true;
    },
  },
});
