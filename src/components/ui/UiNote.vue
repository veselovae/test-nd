<script lang="ts" setup>
import CloseIcon from "../icons/CloseIcon.vue";

const emit = defineEmits(["deleteNote"]);
</script>

<template>
  <div class="note-wrapper">
    <div class="note-title">
      <slot name="name" />
    </div>

    <div class="note-text">
      <slot name="text" />
    </div>

    <div class="btn-wrapper">
      <button @click="emit('deleteNote')">
        <CloseIcon class="close-icon" />
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-wrapper {
  max-width: 506.67px;
  width: 100%;
  min-width: 388.67px;
  max-height: 480px;
  background-color: var(--green-light);
  border-radius: 20px;
  position: relative;
  box-shadow: var(--shadow);

  @media (max-width: 1366px) {
    max-width: 600px;
  }

  @media (max-width: 962px) {
    min-width: 320px;
    max-width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    right: -2px;
    top: -2px;
    border: 20px solid transparent;
    border-top: 20px solid var(--dark);
    border-right: 20px solid var(--dark);
  }

  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    border: 20px solid transparent;
    border-bottom: 20px solid var(--green);
    border-left: 20px solid var(--green);
    border-radius: 0 15px;
  }

  .note-title {
    min-height: 72px;
    line-height: 32px;
    font-size: var(--heading-h4-size);
    font-weight: var(--heading-h4-weight);
    color: var(--white);
    display: flex;
    align-items: center;
    padding: 20px 28px 0;
    border: 0;
    /*border-bottom: 1px solid var(--green);*/
    /*margin-bottom: 20px*/
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  .note-text {
    padding: 20px 28px 0;
    margin-top: 20px;
    border-top: 1px solid var(--green);
    font-size: var(--text-normal-size);
    font-weight: var(--text-normal-weight);
    color: var(--white);
    line-height: 32px;
    max-height: calc(480px - 72px - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    line-clamp: 7;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  .btn-wrapper {
    margin-top: 28px;
    height: 72px;
    text-align: end;
    border: 0;
    border-top: 1px solid var(--green);

    button {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px;
      background-color: transparent;
      border-radius: 15px;
      border: 0;
      font-size: var(--text-normal-size);
      font-weight: var(--text-normal-weight);
      color: var(--white);
      margin-right: 0;
      margin-left: auto;
      padding-right: 8px;
      cursor: pointer;
    }
  }
}
</style>
