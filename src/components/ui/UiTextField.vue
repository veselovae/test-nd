<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  error: string[] | [] | undefined;
  length?: number;
  charBox?: number;
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
      @input="updateValue($event.target?.value)"
    />
    <div class="error-and-char">
      <div class="field-error error" v-if="props.error?.length">
        {{ props.error[0] }}
      </div>

      <div class="num-of-char" v-if="props.charBox">
        {{ props.length }}/{{ props.charBox }}
      </div>
    </div>
  </div>
</template>
