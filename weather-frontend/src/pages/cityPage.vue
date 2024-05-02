<script setup>
import {cityStore} from "stores/cityStore";
import WeeklyBar from "components/WeeklyBar.vue";

const myCityStore = cityStore();
myCityStore.hydrateFromSessionStorage();

</script>

<template>
   <weekly-bar></weekly-bar>
</template>

<style scoped>
    .example{
      width: 100%;
      height: 30vh;
    }
</style>
