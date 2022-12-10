<script setup></script>
<template>
  <figure :class="{ 'is-loading': !isLoaded }" class="custom-image">
    <img
      ref="image"
      v-lazyload
      v-bind="$attrs"
      :data-url="imgSrc"
      :class="{ transparent: !isLoaded }"
      class="custom-image__image"
      @load="isLoaded = true"
    />
    <div
      v-if="!isLoaded"
      v-loading="true"
      :style="loaderStyle"
      class="loader"
    />
  </figure>
</template>

<script>
export const NOIMAGE_URL = "/img/noimg.png";

export default {
  name: "CustomImage",
  inheritAttrs: false,
  props: {
    src: String,
    defaultSrc: {
      type: String,
      default: NOIMAGE_URL,
    },
    loaderColor: {
      type: String,
      default: "#008895",
    },
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    loaderStyle() {
      const { loaderColor } = this;

      return {
        stroke: loaderColor,
      };
    },
    imgSrc: (vm) => (!vm.src ? vm.defaultSrc : vm.src),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.custom-image {
  width: 100%;

  &.is-loading {
    height: 100%;
    position: relative;
  }

  &__image {
    width: 100%;
    min-height: 100px;
    object-fit: contain;
  }

  .loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex: 1;
    justify-content: center;
    height: 100%;
    margin: auto;
  }

  .transparent {
    opacity: 0;
  }
}
</style>
