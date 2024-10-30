<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import OnPasswordIcon from "../icons/OnPasswordIcon.vue";
import OffPasswordIcon from "../icons/OffPasswordIcon.vue";

import { ref, computed } from "vue";

const showPassword = ref(true);
const getPasswordType = computed(() =>
  showPassword.value ? "password" : "text"
);
const toggleShowPassword = () => (showPassword.value = !showPassword.value);

const props = defineProps<{
  modelValue: string;
  error: string[] | [] | undefined;
}>();

const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => emit("update:modelValue", value);
</script>

<template>
  <div class="field">
    <label>
      <slot />
    </label>
    <div class="input-box">
      <input
        :type="getPasswordType"
        placeholder="Введите пароль"
        v-bind="$attrs"
        :value="props.modelValue"
        @input="updateValue($event.target.value)"
      />
      <div class="show-password-btn" @click="toggleShowPassword">
        <OnPasswordIcon v-if="showPassword" />
        <OffPasswordIcon v-if="!showPassword" class="off-password-icon" />
      </div>
    </div>
    <div class="field-error error" v-if="props.error?.length">
      {{ props.error[0] }}
    </div>
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
.field-error {
  margin-top: 8px;
}
</style>
