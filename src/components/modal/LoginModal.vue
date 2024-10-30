<script lang="ts" setup>
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import SigninModal from "../modal/SigninModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
import { useShowModal } from "@/stores/showModal";

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { setCookie } from "@/functions/cookieFunctions";
import { getRequest, processRequestResults } from "@/functions/requests";
import { type ILogInData } from "@/interfaces/modalFields";
import { type IRequestResults } from "@/interfaces/requests";

const router = useRouter();

const modalComponentStore = useSwitchModalComponent();
const showModalStore = useShowModal();

const authData = ref<ILogInData>({
  email: "",
  password: "",
});

const logInResults = ref<null | IRequestResults>(null);

const compliteAuth = async () => {
  const responseJson = await getRequest(
    "auth",
    "post",
    undefined,
    authData.value
  );

  const filter = {
    password: ["пароль"],
    email: ["e-mail", "электронной"],
  };

  logInResults.value = processRequestResults(responseJson, filter);

  if (logInResults.value?.fulfilledValue?.accessToken) {
    setCookie("token", logInResults.value?.fulfilledValue?.accessToken);
    showModalStore.toggleShowModal();
    router.push("/notes");
  }
};

watch(
  () => authData.value.email,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete logInResults.value?.filteredErrors?.email;
    }
  }
);

watch(
  () => authData.value.password,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete logInResults.value?.filteredErrors?.password;
    }
  }
);
</script>

<template>
  <div class="login-modal">
    <h2>Вход в ваш аккаунт</h2>
    <div class="inputs-box">
      <UiTextField
        placeholder="Введите Email"
        type="email"
        v-model.trim="authData.email"
        :error="logInResults?.filteredErrors?.email"
      >
        Email
      </UiTextField>

      <UiPasswordField
        v-model="authData.password"
        :error="logInResults?.filteredErrors?.password"
      >
        Пароль
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

    <div class="login-error error" v-if="logInResults?.totalError">
      {{ logInResults?.totalError }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
