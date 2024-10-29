<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  error: boolean;
  length?: number;
  charBox?: number;
}>();

const emit = defineEmits(["update:modelValue"]);
const updateValue = (value: string) => emit("update:modelValue", value);
</script>

<template>
  <div class="field">
    <label>
      <slot />
    </label>
    <textarea
      v-bind="$attrs"
      :value="props.modelValue"
      @input="updateValue($event.target.value)"
    />
    <div class="error-and-char">
      <div class="field-error error" v-if="props.error">
        <slot name="errorText" />
      </div>

      <div class="num-of-char" v-if="props.charBox">
        {{ props.length }}/{{ props.charBox }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea {
  padding: 16px 28px;
  min-height: 168px;
  resize: none;
}
</style>
