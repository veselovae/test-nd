<script lang="ts" setup>
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import SigninModal from "../modal/SigninModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
import { useShowModal } from "@/stores/showModal";

import { ref } from "vue";
import { setCookie } from "@/functions/cookieFunctions";
import { useRouter } from "vue-router";

const router = useRouter();

const modalComponentStore = useSwitchModalComponent();
const showModalStore = useShowModal();

const authData = ref({
  email: "",
  password: "",
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

const getToken = async (data) => {
  const results = {
    token: "",
    totalError: "",
    filteredErrors: {},
  };
  try {
    const response = await fetch("https://dist.nd.ru/api/auth", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.value),
    });
    const jsonResponse = await response.json();

    if (jsonResponse.statusCode === 400) {
      results.filteredErrors = errorsFilter(jsonResponse.message);
    } else if (jsonResponse.statusCode === 404) {
      results.totalError = jsonResponse.message;
    } else {
      results.token = jsonResponse.accessToken;
    }
  } catch (err) {
    console.error(err);
  }
  return results;
};

const registrationResuts = ref({
  token: "",
  totalError: "",
  filteredErrors: {},
});

const compliteAuth = async () => {
  registrationResuts.value = await getToken(authData);
  if (registrationResuts.value.token) {
    setCookie("token", registrationResuts.value.token);
    showModalStore.toggleShowModal();
    router.push("/notes");
  }
};
</script>

<template>
  <div class="login-modal">
    <h2>Вход в ваш аккаунт</h2>
    <div class="inputs-box">
      <UiTextField
        placeholder="Введите Email"
        type="email"
        v-model.trim="authData.email"
        :error="!!registrationResuts?.filteredErrors?.email?.length"
      >
        Email
        <template v-slot:errorText>{{
          registrationResuts?.filteredErrors?.email[0]
        }}</template>
      </UiTextField>
      <UiPasswordField
        v-model="authData.password"
        :error="!!registrationResuts?.filteredErrors?.password?.length"
      >
        Пароль
        <template v-slot:errorText>{{
          registrationResuts?.filteredErrors?.password[0]
        }}</template>
      </UiPasswordField>
    </div>

    <div class="buttons">
      <div class="sign-in">
        <p>У вас нет аккаунта?</p>
        <button @click="modalComponentStore.switchModalComponent(SigninModal)">
          Зарегистрируйтесь
        </button>
      </div>

      <UiButton @click="compliteAuth">Войти</UiButton>
    </div>

    <div class="login-error error" v-if="registrationResuts.totalError">
      {{ registrationResuts.totalError }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
