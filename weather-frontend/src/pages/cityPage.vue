<template>
  <div class="page-container">
    <div class="page-upper-container">

      <div class="current-data">
        <button @click="takeCoords()">
          click
        </button>
        {{data.value}}
        <br>
        <br>
        <br>
      </div>

      <q-list class="hourly-container">
        <q-item v-for="hour in 25" :key="hour" class="hourly-div">
          <q-item-section>
            {{ hour-1 }}:00
          </q-item-section>
          <q-item-section>
            Field 2
          </q-item-section>
          <q-item-section>
            Field 3
          </q-item-section>
        </q-item>
      </q-list>

    </div>

    <div class="weekly-container">
      <template v-for="(day, index) in arrowDays" :key="index">
        <div class="daily-container">
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

const data = ref({})
const arrowDays = ref([])
const myCityStore = cityStore();
myCityStore.hydrateFromSessionStorage();

onBeforeMount(() =>{
  data.value = takeCoords()
})

const takeCoords  = async () => {
  try {
    const value = "bergamo";
    const params = {
      value,
      num_days: 7
    }

    const {data} = await axios.get(`http://localhost:3000/hourly`, {params: params});

    console.log({data}); // Example: Log the data to the console
    return {data};
  } catch (error) {
    console.error('Error fetching hourly data:', error);
    // Handle errors appropriately (e.g., display error message to user)
  }
}


for(let i=0;i<7;i++){
  const date = new Date()
  date.setDate(date.getDate() + i);
  const dayname = date.toLocaleString('it-IT', { weekday: 'long' });
  const shortDayname = dayname.slice(0, 3);
  arrowDays.value.push(shortDayname);
}
</script>



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
