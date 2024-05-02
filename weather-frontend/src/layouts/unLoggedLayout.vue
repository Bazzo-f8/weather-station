<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <q-icon name="fa-solid fa-cloud-bolt" class="logolayout"></q-icon>
            <p class="titlestyle">Weather Station</p>
          </div>
        </q-toolbar-title>
        <div class="spaceforlogin">
          <q-icon  name="fa-solid fa-circle-user" class="loginlogo"> </q-icon>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <my-footer></my-footer>
  </q-layout>
</template>
<script setup lang="js">
import MyFooter from "components/myFooter.vue";
import loginPopUp from "components/loginPopUp.vue";
</script>
<style scoped>
.loginlogo{
  font-size: 25px;
}
 .logolayout{
   font-size: 40px;
 }
 .titlestyle{
   font-size: 15px;
 }
</style>
