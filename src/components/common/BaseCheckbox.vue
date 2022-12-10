<script setup>
import { ref, computed, useAttrs } from "vue";
const props = defineProps({
  checkboxClass: {
    type: [String, Object, Array],
    default: "base-checkbox__checkbox",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: 0,
  },
  error: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: "",
  },
});
const attrs = useAttrs();
const emit = defineEmits(["change"]);
const checked = ref(props.modelValue);

const handleInput = () => {
  emit("change", { id: props.id, checked: checked.value });
};
// const clear = () => emit("input", "");

const inputProps = computed(() => ({
  ...(attrs || {}),
  disabled: props.disabled,
  checked: checked.value,
  class: props.inputClass,
}));
const classes = computed(() => ({
  "is-active": checked.value,
  "is-disabled": props.disabled,
  "is-error": props.error || props.hint,
}));
</script>
<template>
  <div :class="classes" class="base-checkbox">
    <input type="checkbox" v-bind="inputProps" @change="handleInput" />
    {{ checked }}
    <label v-if="label">{{ label }}</label>
    <div v-if="hint" class="base-checkbox__hint">
      <span>{{ hint }}</span>
    </div>
  </div>
</template>
<style lang="scss">
input:focus {
  outline: none;
}

.base-input {
  display: flex;
  flex-direction: column;
  & label {
    padding: 0 0 5px 0;
    font-weight: 400;
    font-size: 10px;
    line-height: 130%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #767676;
  }
  &__input {
    padding: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    transition: all 0.3s ease-in;
  }
}

.is-active {
  & .base-input {
    &__input {
      border: 1px solid #000000;
    }
  }
}

.is-error {
  & .base-input {
    &__input {
      border: 1px solid #ce0000;
    }
    &__hint {
      color: #ce0000;
      padding: 5px 0;
    }
  }
}
</style>
