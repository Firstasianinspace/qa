<template>
  <div class="grid-layout">
    <slot />
  </div>
</template>
<style lang="scss">
.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 25px;
}
</style>
