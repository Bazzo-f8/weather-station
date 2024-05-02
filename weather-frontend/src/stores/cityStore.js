import { createPinia, defineStore } from 'pinia';
import { useQuasar, SessionStorage } from 'quasar';

const pinia = createPinia();
export const cityStore = defineStore('weather', {
  state: () => ({
    name: '',
    degrees: null,
    precipitation: null,
  }),
  actions: {

    refresh(newCity) {
      const { name, degrees, precipitation } = newCity;
      this.name = name;
      this.degrees = degrees;
      this.precipitation = precipitation;

      SessionStorage.setItem('cityStore', {
        name: this.name,
        degrees: this.degrees,
        precipitation: this.precipitation,
      });
    },
    hydrateFromSessionStorage() {

      const storedData = SessionStorage.getItem('cityStore');
      if (storedData) {
        this.name = storedData.name;
        this.degrees = storedData.degrees;
        this.precipitation = storedData.precipitation;
      }
    },

    clearSessionStorage() {
      SessionStorage.remove('cityStore');
      this.name = '';
      this.degrees = null;
      this.precipitation = null;
    },
  }
});
