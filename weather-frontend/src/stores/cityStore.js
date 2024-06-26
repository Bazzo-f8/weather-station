import { createPinia, defineStore } from 'pinia';
import { useQuasar, SessionStorage } from 'quasar';

const pinia = createPinia();
export const cityStore = defineStore('weather', {
  state: () => ({
    name: '',
    lat: '',
    long: '',
    timezone: '',
    country: '',
    region: '',
  }),
  actions: {

    refresh(newCity) {
      const { name,lat,long,timezone,country,region } = newCity;
      this.name = name;
      this.lat = lat;
      this.long = long;
      this.timezone = timezone;
      this.country = country;
      this.region = region;

      SessionStorage.setItem('cityStore', {
        name: this.name,
        lat: this.lat,
        long: this.long,
        timezone: this.timezone,
        country: this.country,
        region: this.region,
      });
    },
    hydrateFromSessionStorage() {

      const storedData = SessionStorage.getItem('cityStore');
      if (storedData) {
        this.name = storedData.name;
        this.long = storedData.long;
        this.lat = storedData.lat;
        this.timezone = storedData.timezone;
        this.country = storedData.country;
        this.region = storedData.region;
      }
    },

    clearSessionStorage() {
      SessionStorage.remove('cityStore');
        this.name= ''
        this.lat= ''
        this.long=''
        this.timezone= ''
        this.country= ''
        this.region= ''
    },
  }
});
