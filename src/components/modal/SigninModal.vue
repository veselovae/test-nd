<script setup lang="ts">
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import LoginModal from "../modal/LoginModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
import { ref, watch } from "vue";
import { getRequest, processRequestResults } from "@/functions/requests";
import { type ISignInData } from "@/interfaces/modalFields";
import { type IRequestResults } from "@/interfaces/requests";

const modalComponentStore = useSwitchModalComponent();

const regData = ref<ISignInData>({
  email: "",
  password: "",
  confirm_password: "",
});

const regResults = ref<null | IRequestResults>(null);

const compliteReg = async () => {
  const jsonResponse = await getRequest(
    "reg",
    "post",
    undefined,
    regData.value
  );

  const filter = {
    email: ["e-mail", "электронной"],
    password: ["пароль"],
    confirm_password: ["подтверждение пароля"],
  };

  regResults.value = processRequestResults(jsonResponse, filter);

  if (!!regResults.value.fulfilledValue?.id) {
    modalComponentStore.switchModalComponent(LoginModal);
  }
};

watch(
  () => regData.value.email,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete regResults.value?.filteredErrors?.email;
    }
  }
);

watch(
  () => regData.value.password,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete regResults.value?.filteredErrors?.password;
    }
  }
);

watch(
  () => regData.value.confirm_password,
  (newVal, oldVal) => {
    if (oldVal === "" && newVal !== "") {
      delete regResults.value?.filteredErrors?.confirm_password;
    }
  }
);
</script>

<template>
  <div class="signin-modal">
    <h2>Регистрация</h2>
    <div class="inputs-box">
      <UiTextField
        placeholder="Введите Email"
        type="email"
        v-model.trim="regData.email"
        :error="regResults?.filteredErrors?.email"
      >
        Email
      </UiTextField>

      <UiPasswordField
        v-model="regData.password"
        :error="regResults?.filteredErrors?.password"
      >
        Пароль
      </UiPasswordField>

      <UiPasswordField
        v-model="regData.confirm_password"
        :error="regResults?.filteredErrors?.confirm_password"
      >
        Пароль ещё раз
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

    <div class="signin-error error" v-if="regResults?.totalError">
      {{ regResults?.totalError }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
