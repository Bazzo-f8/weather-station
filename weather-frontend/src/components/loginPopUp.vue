<template>
  <div class="q-pa-md">
    <q-card square bordered class="q-pa-lg shadow-1">
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="email"
            type="username"
            label="username"
            lazy-rules
            :rules="[required]"
            ><template v-slot:prepend> <q-icon name="person" /> </template
          ></q-input>
          <q-input
            square
            filled
            clearable
            v-model="password"
            :type="passwordFieldType"
            label="password"
            lazy-rules
            :rules="[required]"
          >
            <template v-slot:prepend> <q-icon name="lock" /> </template
            ><!--visualizza password/non visualizzare-->
            <template v-slot:append>
              <q-icon :name="visibilityIcon" @click="switchVisibility" />
            </template>
          </q-input>
          <q-input
            v-if="RegIf"
            square
            filled
            clearable
            v-model="confirmPassword"
            :type="passwordFieldType"
            label="confirm password"
            lazy-rules
            :rules="[required, checkPassword]"
          >
            <template v-slot:prepend> <q-icon name="lock" /> </template
            ><template v-slot:append>
              <q-icon :name="visibilityIcon" @click="switchVisibility" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          color="blue"
          size="lg"
          class="full-width"
          :label="nameBot"
          @click="isSubmitted"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <q-btn
          no-caps
          flat
          color="black"
          @click="changeToReg"
          label="Non sei loggato? Registrati ✅"
        />
        <q-btn
          no-caps
          unelevated
          rounded
          color="blue 1"
          @click="whitoutLog"
          label="continua senza loggare"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "src/boot/axios";

const router = useRouter();
const confirmPassword = ref("");
const password = ref("");
const email = ref("");
const RegIf = ref(false);
const nameBot = ref("Login");
const visibilityIcon = ref("visibility");
const passwordFieldType = ref("password");


const isSubmitted = async () => {
  if (RegIf.value){
    await loginUser()
  }else{
    await registerUser()
  }
}
//controllo input
const required = (val) => {
  return (val && val.length > 0) || "insert something";
};
const checkPassword = (val) => {
  return (val && val === password.value) || "password doesn't match";
};
//------------------------------------------------------------
//Login page to -> Registration Page
const changeToReg = () => {
  RegIf.value = !RegIf.value;
  if (RegIf.value === false) {
    nameBot.value = "Login";
  } else {
    nameBot.value = "Register";
  }
};
//------------------------------------------------------------
//visualizza password
const switchVisibility = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    visibilityIcon.value = "visibility_off";
  } else {
    passwordFieldType.value = "password";
    visibilityIcon.value = "visibility";
  }
};
//collegamento back end
const loginUser = async () => {
  try {
    const username = user.value
    const password = pass.value
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password,
    });

    if (response.status === 200) { // Check for successful login (200 OK)
      console.log('Login successful:', response.data);
      return response.data; // Return the response data (including token)
    } else {
      console.error('Login failed:', response.data);
      throw new Error('Login failed'); // Throw an error for handling in the calling code
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
}


const registerUser = async () => {
  try {
    const username = user.value
    const password = pass.value
    const response = await axios.post('http://localhost:3000/auth/register', {
      username,
      password,
    });


    if (response.status === 201) { // Check for successful registration (201 Created)
      console.log('User registered successfully:', response.data);
      registered.value = response.data; // Return the response data (optional)
    } else {
      console.error('Registration failed:', response.data);
      throw new Error('Registration failed'); // Throw an error to handle in the calling code
    }
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------
const whitoutLog = () => {
  router.push("/");
};
</script>

<style>
.q-card {
  width: 400px;
  margin: auto;
}
</style>
