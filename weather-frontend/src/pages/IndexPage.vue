<template>
  <q-page class="flex flex-center">
    <div>
      <div id="q-app" style="min-height: 50vh;">
        <div class="q-pa-md">
          <div class="q-gutter-md row">
            <q-select
              class="searchbar"
              filled
              v-model="searchBar"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              hint="city filter"
            >
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const searchBar = ref('')
</script>

