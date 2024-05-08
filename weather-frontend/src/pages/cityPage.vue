<template>
  <div class="page-container">
    <div class="page-upper-container">

        <div class="current-data">
          <button @click="prova()">
            click
          </button>
          <br>
          <br>
          <br>
        </div>

      <q-list class="hourly-container">
        <q-item v-for="(index) in 25" :key="index" class="hourly-div">
          <q-item-section>
            {{index}}:00
          </q-item-section>
          <q-item-section>

          </q-item-section>
          <q-item-section>
            Field 3
          </q-item-section>
        </q-item>
      </q-list>

    </div>

    <div class="weekly-container">
      <template v-for="(day, index) in arrayDays" :key="index">
        <div class="daily-container" @click="changeDay(index)">
          <q-icon name="fa-solid fa-sun" class="daily-icon"></q-icon>
          <div class="daily-title">
            {{day}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup>
import {cityStore} from "stores/cityStore";
import {ref, onBeforeMount} from 'vue'
import axios from 'axios';
import _ from 'lodash'

const loaded = ref(false);
const dataForDays = ref([])
const data = ref({})
const arrayDays = ref([])
const myCityStore = cityStore();
const currentDay = ref([])
myCityStore.hydrateFromSessionStorage();


const thisCity = {
    name: myCityStore.name,
    lat: myCityStore.lat,
    long: myCityStore.long,
    timezone: myCityStore.timezone,
    country: myCityStore.country,
    region: myCityStore.region,
}

onBeforeMount(()=>{
  createDays()
  beforeMount()
})

const beforeMount = async () => {
  console.log(thisCity)
  await fetchHourlyWeather(thisCity)
  splitForWeek()
  currentDay.value = { ... dataForDays.value[0]}
}




async function fetchHourlyWeather(city) {
  try {
    console.log((city))
    const response = await axios.get(`http://localhost:3000/hourly`, {
      params: {
        city: JSON.stringify(city), // Stringify city object for query parameter
        num_days: 7, // Number of days as a string (already done on the backend)
      },
    });
    const data = response.data;
    // Handle the fetched data here (e.g., update UI, store in state)
    console.log("data" + data); // Example: Log the data to the console

    return data; // You can return the data if needed
  } catch (error) {
    console.error('Error fetching hourly weather:', error);
    // Handle errors appropriately (e.g., display error message to user)
  }
}


const splitForWeek = () => {
  for (let i = 0; i < 6; i++) {
    let splitVar = i*24
    let secondSplitVar = i*24+24
    dataForDays.value[i] ={
      time: data.value.time.slice(splitVar,secondSplitVar),
      apparent_temperature: data.value.apparent_temperature.slice(splitVar, secondSplitVar),
      cloud_cover: data.value.cloud_cover.slice(splitVar, secondSplitVar),
      precipitation: data.value.precipitation.slice(splitVar, secondSplitVar),
      precipitation_probability: data.value.precipitation_probability.slice(splitVar, secondSplitVar),
      pressure_msl: data.value.pressure_msl.slice(splitVar, secondSplitVar),
      relative_humidity_2m: data.value.relative_humidity_2m.slice(splitVar, secondSplitVar),
      soil_moisture_3_to_9cm: data.value.soil_moisture_3_to_9cm.slice(splitVar, secondSplitVar),
      soil_temperature_6cm: data.value.soil_temperature_6cm.slice(splitVar, secondSplitVar),
      surface_pressure: data.value.surface_pressure.slice(splitVar, secondSplitVar),
      temperature_2m: data.value.temperature_2m.slice(splitVar, secondSplitVar),
      wind_direction_80m: data.value.wind_direction_80m.slice(splitVar, secondSplitVar),
    }
  }
  console.log(dataForDays.value[i])
  loaded.value=true;
}
const createDays = () => {
  for(let i=0;i<7;i++){
    const date = new Date()
    date.setDate(date.getDate() + i);
    const dayname = date.toLocaleString('it-IT', { weekday: 'long' });
    const shortDayname = dayname.slice(0, 3);
    arrayDays.value.push(shortDayname);
  }
}

const changeDay = (index) => {
  currentDay.value =  { ... dataForDays.value[index]}
  console.log(currentDay.value)
}
const createVoidArray = () => {
  for(let i=0;i<7;i++){
    dataForDays.value[i] ={
      time: null,
      apparent_temperature: null,
      cloud_cover: null,
      precipitation: null,
      precipitation_probability: null,
      pressure_msl: null,
      relative_humidity_2m: null,
      soil_moisture_3_to_9cm:null,
      soil_temperature_6cm: null,
      surface_pressure: null,
      temperature_2m: null,
      wind_direction_80m:null,
    }
    console.log(dataForDays.value)
  }
}
</script>
dataForDays.value[i].time = _.slice(data.value.time, splitVar, secondSplitVar);
dataForDays.value[i].apparent_temperature = _.slice(data.value.apparent_temperature, splitVar, secondSplitVar);
dataForDays.value[i].cloud_cover = _.slice(data.value.cloud_cover, splitVar, secondSplitVar);
dataForDays.value[i].precipitation = _.slice(data.value.precipitation, splitVar, secondSplitVar);
dataForDays.value[i].precipitation_probability = _.slice(data.value.precipitation_probability, splitVar, secondSplitVar);
dataForDays.value[i].pressure_msl = _.slice(data.value.pressure_msl, splitVar, secondSplitVar);
dataForDays.value[i].relative_humidity_2m = _.slice(data.value.relative_humidity_2m, splitVar, secondSplitVar);
dataForDays.value[i].soil_moisture_3_to_9cm = _.slice(data.value.soil_moisture_3_to_9cm, splitVar, secondSplitVar);
dataForDays.value[i].soil_temperature_6cm = _.slice(data.value.soil_temperature_6cm, splitVar, secondSplitVar);
dataForDays.value[i].surface_pressure = _.slice(data.value.surface_pressure, splitVar, secondSplitVar);
dataForDays.value[i].temperature_2m = _.slice(data.value.temperature_2m, splitVar, secondSplitVar);
dataForDays.value[i].wind_direction_80m = _.slice(data.value.wind_direction_80m, splitVar, secondSplitVar);
<!--// const takeDataBeforeMount = async () => {-->
<!--//   try {-->
<!--//     const value = myCityStore.name;-->
<!--//     const params = {-->
<!--//       value,-->
<!--//     }-->
<!--//     const response = await axios.get(`http://localhost:3000/`, {params: params});-->
<!--//   } catch (error) {-->
<!--//     console.error('Error fetching hourly data:', error);-->
<!--//   }-->
<!--// }-->

<!--const takeCoords  = async () => {-->
<!--try {-->
<!--const value = myCityStore;-->
<!--const params = {-->
<!--value,-->
<!--num_days: 7-->
<!--}-->

<!--//const {data} = await axios.get(`http://localhost:3000/hourly`, {params: params});-->
<!--const response = await axios.get(`http://localhost:3000/hourly`, {params: params});-->
<!--data.value = response.data;-->
<!--} catch (error) {-->
<!--console.error('Error fetching hourly data:', error);-->
<!--// Handle errors appropriately (e.g., display error message to user)-->
<!--}-->
<!--}-->
<style scoped>
.page-upper-container{
  display:flex;
}

.current-data{
  background-color: #ec0000;
  width: 40%;
  height: 50%;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  overflow-y:auto;
}

.weekly-container{
  position: absolute;
  display: flex;
  margin-left: 10vw;
  width: 40vw;
  height: 10vh;
  min-width: 350px;
  min-height: 100px;
  background-color: #373636;
  border-radius: 20px;
}
.daily-container{
  margin:5px;
  width: 12%;
  height: 90%;
  border-radius: 25px;
}
.daily-container:hover{
  background-color: rgba(255, 255, 255, 0.51);
}
.daily-icon{
  width: 100%;
  height: 60%;
  font-size:40px ;
}
.daily-title{
  font-family: monospace;
  font-weight: lighter;
  text-align: center;
  font-size: 20px;
  color: #fff;
}



.hourly-container{
  color: white;
  background-color: #373636;
  width: 35%;
  height: 60vh;
  margin-top: 1%;
  border-radius: 20px;
  overflow-y: auto!important;
  scrollbar-width: none;
}
.hourly-div:hover {
  background-color: rgba(255, 255, 255, 0.51);
  border-radius: 20px;
}
</style>
