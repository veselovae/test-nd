<script lang="ts" setup>
import UiTextField from "../ui/UiTextField.vue";
import UiPasswordField from "../ui/UiPasswordField.vue";
import UiButton from "../ui/UiButton.vue";
import SigninModal from "../modal/SigninModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
const modalComponentStore = useSwitchModalComponent();
</script>

<template>
  <div class="login-modal">
    <h2>Вход в ваш аккаунт</h2>
    <div class="inputs-box">
      <UiTextField placeholder="Введите Email" type="email">
        Email
      </UiTextField>
      <UiPasswordField>Пароль</UiPasswordField>
    </div>

    <div class="buttons">
      <div class="sign-in">
        <p>У вас нет аккаунта?</p>
        <button @click="modalComponentStore.switchModalComponent(SigninModal)">
          Зарегистрируйтесь
        </button>
      </div>

      <UiButton>Войти</UiButton>
    </div>

    <div class="login-error error" v-if="false">
      Пользователь с таким логином не найден
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-error {
  background-color: #ff74611a;
  border-radius: 24px;
  border: 0;
  margin-top: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
