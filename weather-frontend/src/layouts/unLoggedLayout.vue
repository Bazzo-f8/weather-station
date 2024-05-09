<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>

            <q-avatar>
              <img src="public/icons/favicon-96x96.png" />
            </q-avatar>
           Weather Station
        </q-toolbar-title>
        <router-link to="login">
          <div class="spaceforlogin">
            <q-icon
              name="fa-solid fa-circle-user"
              class="loginlogo"
              color="white"
            >
            </q-icon>
          </div>
        </router-link>
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
