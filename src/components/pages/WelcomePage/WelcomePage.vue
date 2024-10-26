<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import ImgBackground from "./ImgBackground.vue";

import UiModal from "@/components/ui/UiModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";

const modalComponentStore = useSwitchModalComponent();
</script>

<template>
  <div class="welcome-wrapper page-wrapper">
    <UiModal>
      <component :is="modalComponentStore.modalComponent" />
    </UiModal>
    <TheHeader />
    <div class="wecome-content-wrapper">
      <div class="welcome-content">
        <div class="text-wrapper">
          <div class="text-content">
            <h1>Мои заметки</h1>
            <h3>Не забывай о важном, храни его в облаке.</h3>
          </div>
        </div>

        <div class="img-wrapper">
          <ImgBackground class="img-background" />
          <img src="@/assets/img/welcome-img.png" alt="welcome" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wecome-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 160px;
  height: calc(100vh - 136px);

  .welcome-content {
    max-height: calc(1000px - 136px);
    width: 100%;
    height: 100%;
    display: flex;
    gap: 61px;
  }

  .text-wrapper {
    color: var(--white);
    max-width: 642px;
    height: 100%;
    align-content: center;

    .text-content {
      position: relative;
      top: -23px;

      h1 {
        font-size: var(--heading-h1-size);
        font-weight: var(--heading-h1-weight);
        line-height: 104px;
        margin-bottom: 40px;
      }

      h3 {
        font-size: var(--heading-h3-size);
        font-weight: var(--heading-h3-weight);
        color: var(--gray);
        max-width: 394px;
        line-height: 48px;
      }
    }
  }

  .img-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 897px;
    width: 100%;
    height: 100%;

    .img-background {
      position: absolute;
      z-index: 0;
      top: 0;
      width: 100%;
    }

    img {
      position: absolute;
      bottom: 0;
      z-index: 3;
      max-width: 684.88px;
      width: 100%;
    }
  }
}
</style>
