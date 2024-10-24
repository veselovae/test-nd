<!-- <script lang="ts">
export default {
  inheritAttrs: false,
};
</script> -->

<script lang="ts" setup>
import OnPasswordIcon from "../icons/OnPasswordIcon.vue";
import OffPasswordIcon from "../icons/OffPasswordIcon.vue";

import { ref, computed } from "vue";

const showPassword = ref(true);
const getPasswordType = computed(() =>
  showPassword.value ? "password" : "text"
);
const toggleShowPassword = () => (showPassword.value = !showPassword.value);
</script>

<template>
  <div class="field">
    <label>
      <slot />
    </label>
    <div class="input-box">
      <input :type="getPasswordType" placeholder="Введите пароль" />
      <div class="show-password-btn" @click="toggleShowPassword">
        <OnPasswordIcon v-if="showPassword" />
        <OffPasswordIcon v-if="!showPassword" class="off-password-icon" />
      </div>
    </div>
    <div class="field-error error" v-if="false">Неверный email</div>
  </div>
</template>

<style scoped lang="scss">
.input-box {
  position: relative;

  input {
    width: 100%;
  }
}

.show-password-btn {
  cursor: pointer;
  position: absolute;
  bottom: 26px;
  right: 28px;

  .off-password-icon {
    position: relative;
    top: 1px;
  }
}
</style>
