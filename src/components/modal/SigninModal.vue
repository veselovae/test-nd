<script setup lang="ts">
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import LoginModal from "../modal/LoginModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";

const modalComponentStore = useSwitchModalComponent();
</script>

<template>
  <div class="signin-modal">
    <h2>Регистрация</h2>
    <div class="inputs-box">
      <UiTextField placeholder="Введите Email" type="email">
        Email
      </UiTextField>
      <UiPasswordField>Пароль</UiPasswordField>
      <UiPasswordField>Пароль ещё раз</UiPasswordField>
    </div>

    <div class="buttons">
      <div class="sign-in">
        <p>У вас есть аккаунт?</p>
        <button @click="modalComponentStore.switchModalComponent(LoginModal)">
          Войдите
        </button>
      </div>

      <UiButton>Зарегистрироваться</UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
