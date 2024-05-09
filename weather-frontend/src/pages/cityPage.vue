<template>
  <div class="page-container">
    <div class="page-upper-container">

        <div class="current-data">
          apparent temperature: {{currentDay.value.apparent_temperature}}°
          <br>
          humidity: {{currentDay.value.relative_humidity_2m}}
          <br>
          {{icon.value}}
          <br>
        </div>

      <q-list class="hourly-container" v-if="loaded">
        <q-item v-for="(index) in 24" :key="index" class="hourly-div" @click="ChangeHour(index)">
          <q-item-section>
            {{index-1}}:00
          </q-item-section>
          <q-item-section>
            {{currentDay.value?.apparent_temperature?.[index]}}°
          </q-item-section>
          <q-item-section>
            {{currentDay.value?.wind_direction_80m?.[index]}}°
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
const icon = ref('')
const loaded = ref(false);
const currentHour = ref({})
const dataForDays = ref([])
const localData = ref({})
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
  beforeMount()
  createDays()
})

const chooseIcon = (hour) => {
  switch(currentDay.value.precipitation[hour]){         //scambiare i valori con i valori della pioggia
    case 1 : icon.value= 'fa-solid fa-sun'
      break;
    case 2:  icon.value= 'fa-solid fa-cloud-rain'
      break;
    case 3:  icon.value= 'fa-solid fa-cloud-showers-heavy'
      break;
    case 4: icon.value= 'fa-solid fa-snowflake'
  }
}

const beforeMount = async () => {
  localData.value = await fetchHourlyWeather(thisCity)
  await splitForWeek()
  console.log("finished async functions")
  console.log(currentDay.value)
}

async function fetchHourlyWeather(city) {
  try {
    const response = await axios.get(`http://localhost:3000/hourly`, {
      params: {
        city: JSON.stringify(city), // Stringify city object for query parameter
        num_days: 7, // Number of days as a string (already done on the backend)
      },
    });
    const data = response.data;
    // Handle the fetched data here (e.g., update UI, store in state)
    console.log("finished hourly api"); // Example: Log the data to the console
    return data; // You can return the data if needed
  } catch (error) {
    console.error('Error fetching hourly weather:', error);
    // Handle errors appropriately (e.g., display error message to user)
  }
}


const splitForWeek = async () => {
  for (let i = 0; i < 7; i++) {
    let splitVar = i*24
    let secondSplitVar = i*24+24
      dataForDays.value[i] ={
        time: _.slice(localData.value.time, splitVar,secondSplitVar),
        apparent_temperature: _.slice( localData.value.apparent_temperature, splitVar, secondSplitVar),
        cloud_cover: _.slice (localData.value.cloud_cover, splitVar, secondSplitVar),
        precipitation: _.slice (localData.value.precipitation, splitVar, secondSplitVar),
        precipitation_probability: _.slice (localData.value.precipitation_probability, splitVar, secondSplitVar),
        pressure_msl: _.slice (localData.value.pressure_msl, splitVar, secondSplitVar),
        relative_humidity_2m: _.slice (localData.value.relative_humidity_2m, splitVar, secondSplitVar),
        soil_moisture_3_to_9cm: _.slice (localData.value.soil_moisture_3_to_9cm, splitVar, secondSplitVar),
        soil_temperature_6cm: _.slice (localData.value.soil_temperature_6cm, splitVar, secondSplitVar),
        surface_pressure: _.slice (localData.value.surface_pressure, splitVar, secondSplitVar),
        temperature_2m: _.slice (localData.value.temperature_2m, splitVar, secondSplitVar),
        wind_direction_80m: _.slice (localData.value.wind_direction_80m, splitVar, secondSplitVar),
      }
  }
  currentDay.value = { ... dataForDays.value[0]}
  currentHour.value = {... currentDay.value[0]}
  console.log(currentDay.value)
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
const ChangeHour = (hour) => {
  currentHour.value = {... currentDay.value[hour]};
  chooseIcon(currentDay.value.precipitation[hour])
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
  background-color: #ffffff;
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
