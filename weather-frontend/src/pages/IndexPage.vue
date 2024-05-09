<template>
  <q-page class="flex flex-center back">
    <div class="search-area">
      <div class="q-gutter-md row">
        <q-input outlined v-model="searchBar" label="Search City" />
      <q-btn push color="primary" label="Push" @click="searchForCity"/>
      </div>
    </div>
  </q-page>
  <div v-if="isSearched">
    <div v-for="city in cityData" :key="city.name">
      <card-component :city="city"></card-component>
    </div>
  </div>

</template>

<script setup>
import axios from "axios";
import { ref } from 'vue'
import CardComponent from "components/cardComponent.vue";
const searchBar = ref('')
const cityData = ref([])


const isSearched = () => {
  return cityData.value.length > 0;

}
async function searchForCity() {
  try {
    // console.log(searchBar.value)
    // return

    const search = searchBar.value;
    console.log(search);
    const response = await axios.get(`http://localhost:3000/search-city`, {
      params: {
        value: search, // Search term from the frontend
      },
    });

    cityData.value = response.data;

    // Handle the fetched city data here (e.g., display suggestions, update UI)
    console.log(cityData.value); // Example: Log the data to the console
  } catch (error) {
    console.error('Error fetching city:', error);
  }
}


</script>


<style scoped>
.search-area{
  margin-top: 1%;
  margin-right: 10%;
  margin-bottom: -3%;
}
.result-bar{
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
