<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import ImgBackground from "./ImgBackground.vue";
import LoginModal from "@/components/modal/LoginModal.vue";
import SigninModal from "@/components/modal/SigninModal.vue";

import UiModal from "@/components/ui/UiModal.vue";

import { useSwitchModalComponent } from "@/stores/switchModalComponent";
import { useShowModal } from "@/stores/showModal";

const modalComponentStore = useSwitchModalComponent();
const modal = useShowModal();

const checkModalComponent = () => {
  if (modalComponentStore.modalComponent === SigninModal) {
    modalComponentStore.switchModalComponent(LoginModal);
  }
  modal.toggleShowModal();
};
</script>

<template>
  <div class="welcome-wrapper page-wrapper">
    <UiModal @checkModalComponent="checkModalComponent">
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
  overflow-y: hidden;

  @media screen and (max-width: 1367px) {
    padding: 0 80px;
  }

  @media screen and (max-width: 731px) {
    padding: 0 40px;
  }

  @media screen and (max-width: 401px) {
    padding: 0 20px;
  }

  .welcome-content {
    max-height: calc(100vh - 136px);
    width: 100%;
    height: 100%;
    display: flex;
    gap: 61px;

    @media screen and (max-width: 1367px) {
      gap: 90px;
    }

    @media (orientation: portrait) {
      flex-direction: column;
      gap: 0;
    }
  }

  .text-wrapper {
    color: var(--white);
    max-width: 642px;
    height: 100%;
    align-content: center;

    @media (orientation: portrait) {
      max-width: 100%;
      width: 100%;
      height: max-content;
      display: flex;
      justify-content: center;
      padding-top: 10px;
    }

    .text-content {
      position: relative;
      top: -23px;

      @media (orientation: portrait) {
        max-width: 688px;
        width: 100%;
        height: max-content;
        text-align: center;
      }

      h1 {
        font-size: var(--heading-h1-size);
        font-weight: var(--heading-h1-weight);
        line-height: 104px;
        margin-bottom: 40px;

        @media (orientation: portrait) and (max-width: 620px) {
          font-size: 60px;
          line-height: 64px;
          margin-bottom: 20px;
        }
      }

      h3 {
        font-size: var(--heading-h3-size);
        font-weight: var(--heading-h3-weight);
        color: var(--gray);
        max-width: 394px;
        line-height: 48px;

        @media screen and (max-width: 1367px) {
          max-width: 100%;
        }

        @media (orientation: portrait) and (max-width: 501px) {
          font-size: 24px;
          line-height: 36px;
        }
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

    @media (orientation: portrait) {
      height: 100%;
      align-self: center;
    }

    .img-background {
      position: absolute;
      z-index: 0;
      top: 0;
      width: 100%;
      height: 100%;
      /*object-fit: contain;*/
    }

    img {
      position: absolute;
      bottom: -17px;
      z-index: 3;
      max-width: 684.88px;
      width: 76%;
      height: 86%;
      object-fit: contain;
    }
  }
}
</style>
