<script setup lang="ts">
import LogoIcon from "@/components/icons/LogoIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
</script>

<template>
  <header>
    <div class="logo">
      <LogoIcon />
    </div>

    <div class="user-box">
      <p class="email">e-mail@mail.mail</p>
      <div class="user-icon-wrapper">
        <UserIcon />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.user-box {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--text-small-size);
  font-weight: var(--text-small-weight);
  color: var(--white);

  .user-icon-wrapper {
    padding: 14px 18px;
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dark-middle);
    border-radius: 50%;
    border: 0;
    cursor: pointer;
  }
}
</style>
