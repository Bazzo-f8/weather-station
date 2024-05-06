<template>
<div class="search-area">
    <div class="q-gutter-md row">
      <q-select
        class="searchbar"
        filled
        v-model="searchBar"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        placeholder="city filter"
      >
        <!--        :options="options"-->
        <!--        @filter="filterFn"-->
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
const searchBar = ref('')
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
