<script setup lang="ts">
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import LoginModal from "../modal/LoginModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
import { ref } from "vue";

const modalComponentStore = useSwitchModalComponent();

interface IRegData {
  email: string;
  password: string;
  confirm_password: string;
}

const regData = ref<IRegData>({
  email: "",
  password: "",
  confirm_password: "",
});

type fieldError = string[] | [];

interface IFieldErrors {
  email: fieldError;
  password: fieldError;
  confirm_password: fieldError;
}

const errorsFilter = (errors: string[]) => {
  const filtered: IFieldErrors = {
    email: [],
    password: [],
    confirm_password: [],
  };
  errors.forEach((err) => {
    if (err.toLowerCase().indexOf("пароль") !== -1) {
      filtered.password.push(err);
    } else if (err.toLowerCase().indexOf("подтверждение пароля") !== -1) {
      filtered.confirm_password.push(err);
    } else if (
      err.toLowerCase().indexOf("E-Mail") !== -1 ||
      err.toLowerCase().indexOf("электронной") !== -1
    ) {
      filtered.email.push(err);
    }
  });
  return filtered;
};

// let filteredErrors: IFieldErrors;
// let totalError: string;

const tryReg = async () => {
  const results = {
    filteredErrors: {},
    totalError: "",
    success: false,
  };

  try {
    const response = await fetch("https://dist.nd.ru/api/reg", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regData.value),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.statusCode === 400) {
      results.filteredErrors = errorsFilter(jsonResponse.message);
    } else if (jsonResponse.statusCode === 409) {
      results.totalError = jsonResponse.message;
    } else {
      results.success = true;
    }
  } catch (err) {
    console.error(err);
  }
  return results;
};

const registrationResuts = ref({
  filteredErrors: {},
  totalError: "",
  success: false,
});

const compliteReg = async () => {
  registrationResuts.value = await tryReg();
  if (!!registrationResuts.value.success) {
    modalComponentStore.switchModalComponent(LoginModal);
  }
};
</script>

<template>
  <div class="signin-modal">
    <h2>Регистрация</h2>
    <div class="inputs-box">
      <UiTextField
        placeholder="Введите Email"
        type="email"
        v-model.trim="regData.email"
        :error="!!registrationResuts?.filteredErrors?.email?.length"
      >
        Email
        <template v-slot:errorText>{{
          registrationResuts?.filteredErrors?.email[0]
        }}</template>
      </UiTextField>
      <UiPasswordField
        v-model="regData.password"
        :error="!!registrationResuts?.filteredErrors?.password?.length"
      >
        Пароль
        <template v-slot:errorText>{{
          registrationResuts?.filteredErrors?.password[0]
        }}</template>
      </UiPasswordField>
      <UiPasswordField
        v-model="regData.confirm_password"
        :error="!!registrationResuts?.filteredErrors?.confirm_password?.length"
      >
        Пароль ещё раз
        <template v-slot:errorText>{{
          registrationResuts?.filteredErrors?.confirm_password[0]
        }}</template>
      </UiPasswordField>
    </div>

    <div class="buttons">
      <div class="sign-in">
        <p>У вас есть аккаунт?</p>
        <button @click="modalComponentStore.switchModalComponent(LoginModal)">
          Войдите
        </button>
      </div>

      <UiButton @click="compliteReg">Зарегистрироваться</UiButton>
    </div>

    <div class="signin-error error" v-if="registrationResuts?.totalError">
      {{ registrationResuts?.totalError }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
