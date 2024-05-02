<template>
  <div>
  <q-card square bordered class="q-pa-lg shadow-1">
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input
          square
          filled
          clearable
          v-model="email"
          type="email"
          label="email"
          lazy-rules
          :rules="[required, isEmail]"
        ><template v-slot:prepend> <q-icon name="mail" /> </template
        ></q-input>
        <q-input
          square
          filled
          clearable
          v-model="password"
          :type="passwordFieldType"
          label="password"
          lazy-rules
          :rules="[required, tooShort, includeNumber]"
        >
          <template v-slot:prepend> <q-icon name="lock" /> </template
          ><template v-slot:append>
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
        color="purple-4 "
        size="lg"
        class="full-width"
        :label="nameBot"
        @click="submit"
      />
    </q-card-actions>
    <q-card-section class="text-center q-pa-none">
      <q-btn
        no-caps
        flat
        color="purple 6"
        @click="changeToReg"
        label="non sei loggato? registrati"
      />
      <q-btn
        no-caps
        unelevated
        rounded
        color="purple 1"
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

const router = useRouter();
const confirmPassword = ref("");
const password = ref("");
const email = ref("");
const RegIf = ref(false);
const nameBot = ref("Login");
const visibilityIcon = ref("visibility");
const passwordFieldType = ref("password");
//controllo input-------------------------------------------------------------------------------------------------------------------------------------
const required = (val) => {
  return (val && val.length > 0) || "insert something";
};

const isEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "insert a valid Email address";
};

const tooShort = (val) => {
  return (val && val.length > 3) || "you have to use at least 3 characters";
};

const includeNumber = (val) => {
  return (val && /\d/.test(val)) || "you have to use at least one number";
};
const checkPassword = (val) => {
  return (val && val === password.value) || "password doesn't match";
};
//-------------------------------------------------------------------------------------------------------------------------------------
const changeToReg = () => {
  RegIf.value = !RegIf.value;
  if (RegIf.value === false) {
    nameBot.value = "Login";
  } else {
    nameBot.value = "Register";
  }
};

const switchVisibility = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    visibilityIcon.value = "visibility_off";
  } else {
    passwordFieldType.value = "password";
    visibilityIcon.value = "visibility";
  }
};

const submit = () => {
  return 0;
};
//-------------------------------------------------------------------------------------------------------------------------------------
const whitoutLog = () => {
  router.push("/");
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
