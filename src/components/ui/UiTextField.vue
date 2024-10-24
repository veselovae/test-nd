<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="field">
    <label>
      <slot />
    </label>
    <input v-bind="$attrs" />
    <div class="field-error error" v-if="false">Неверный email</div>
  </div>
</template>
