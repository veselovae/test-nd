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
  charBox?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="field">
    <label>
      <slot />
    </label>
    <input
      v-bind="$attrs"
      :value="props.modelValue"
      @input="updateValue($event.target.value)"
    />
    <div class="error-and-char">
      <div class="field-error error" v-if="props.error">
        <slot name="errorText" />
      </div>

      <div class="num-of-char" v-if="props.charBox">{{ props.length }}/100</div>
    </div>
  </div>
</template>
