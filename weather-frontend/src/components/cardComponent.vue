<script setup>
import {cityStore} from "stores/cityStore";
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router";
const myCityStore = cityStore();

const router = useRouter();
const precipitation = ref('')

onMounted(()=>{
})

const Prop = defineProps({
  city: {
    type: Object
  }
})

const goToCity = () =>{
  myCityStore.refresh(Prop.city);
  router.push({ path: `/city/${Prop.city.name}`})
}
</script>

<template>

  <q-card class="my-card" @click="goToCity">

        <q-card-section class="bg-light-blue-4 text-white">
          <div class="text-h6"> {{Prop.city.name}} </div>
          <div class="absolute-bottom text-subtitle2 text-center">
            {{ Prop.city.region }}
          </div>
        </q-card-section>

        <q-card-actions vertical align="center" class="iconExternalCard">
            {{Prop.city.region}}
        </q-card-actions>
      </q-card>
</template>

<style scoped>
.iconCard{
  margin-top:2vb;
  font-size: 400%;
  transition: transform 0.8s ease-in-out;
}
.iconCard:hover {
  transform: rotate(30deg); /* Apply rotation on hover */
}
.my-card{
  background-color: #5fa6aa;
  width: 25%;
  margin:3%;
  float: left;
  border-radius: 12px;
  height: 22vb;
}
</style>
