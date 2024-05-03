<script setup>
import cardComponent from 'components/cardComponent.vue'
import axios from "axios";

const arrayCity = [
  {
    name: 'Bergamo',
    degrees: 19,
    precipitation: 2,
  },
  {
    name: 'Brescia',
    degrees: 5,
    precipitation: 0,
  },
  {
    name: 'Cene',
    degrees: 1.4,
    precipitation: 3,
  },
  {
    name: 'Alzano',
    degrees: 14,
    precipitation: 1,
  },
  {
    name: 'Gazzaniga',
    degrees: 15,
    precipitation: 1,
  },
  {
    name: 'Gavarno ',
    degrees: -1,
    precipitation: 3,
  }
]
</script>

<template>
  <div class="q-pa-md cardContainer">
    <template v-for="index in arrayCity.length" :key="index">
      <card-component :city="arrayCity[index-1]"></card-component>
    </template>
  </div>
</template>

<style scoped>

</style>
