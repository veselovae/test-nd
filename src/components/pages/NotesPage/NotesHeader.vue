<script setup lang="ts">
import LogoIcon from "@/components/icons/LogoIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";

import { useUser } from "@/stores/user";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { deleteCookie } from "@/functions/cookieFunctions";

const userStore = useUser();
const router = useRouter();

const isUserMenu = ref(false);
const toggleUserMenu = () => (isUserMenu.value = !isUserMenu.value);

const logOut = () => {
  deleteCookie("token");
  router.push("/");
};

onMounted(() => (isUserMenu.value = false));
</script>

<template>
  <header>
    <div class="logo">
      <LogoIcon class="logo-icon" />
    </div>

    <div class="user-box">
      <p class="email">{{ userStore.user }}</p>
      <div
        class="user-icon-wrapper"
        @click="toggleUserMenu"
        title="Пользователь"
      >
        <UserIcon />
      </div>
      <div class="user-menu" v-show="isUserMenu">
        <span @click="logOut">Выйти</span>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.user-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--text-small-size);
  font-weight: var(--text-small-weight);
  color: var(--white);
  z-index: 900;

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

  .email {
    @media (max-width: 601px) {
      display: none;
    }
  }

  .user-menu {
    background-color: var(--dark-middle);
    position: absolute;
    box-shadow: var(--shadow);
    bottom: -130px;
    right: 0;
    padding: 40px;
    border-radius: 12px;
    font-size: var(--text-small-size);
    font-weight: var(--text-small-bold-weight);
    color: var(--green-light);

    &::after {
      content: "";
      position: absolute;
      right: 20px;
      top: -17px;
      border: 9px solid transparent;
      border-bottom: 9px solid var(--dark-middle);
    }

    span {
      cursor: pointer;

      &:hover {
        color: var(--green-middle);
      }

      &:active {
        color: var(--green-dark);
      }

      &:disabled {
        color: var(--gray);
      }
    }
  }
}
</style>
