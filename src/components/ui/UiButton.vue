<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: var(--green-light);
  border-radius: 32px;
  padding: 12px 24px;
  color: var(--white);
  font-size: var(--text-normal-size);
  font-weight: var(--text-normal-weight);
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover {
    background-color: var(--green-middle);
  }

  &:active {
    background-color: var(--green-dark);
  }

  &:disabled {
    background-color: var(--gray);
  }
}
</style>
