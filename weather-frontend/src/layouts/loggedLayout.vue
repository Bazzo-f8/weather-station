<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="public/icons/favicon-96x96.png">
          </q-avatar>
          Weather Station
        </q-toolbar-title>
        <div class="spaceforlogin">
          <q-icon  name="fa-solid fa-circle-user" class="loginlogo"> </q-icon>
        </div>
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/" label="Search" />
        <q-route-tab to="/Favourite" label="Favourite" />
      </q-tabs>
    </q-header>
    <my-footer></my-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import MyFooter from "components/myFooter.vue";

</script>
<style scoped>
.loginlogo{
  font-size: 25px;
}
</style>
