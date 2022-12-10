<script setup>
import { ref, computed, useAttrs } from "vue";
const props = defineProps({
  inputClass: {
    type: [String, Object, Array],
    default: "base-input__input",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
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
const isActive = ref(false);
const emit = defineEmits(["update:modelValue", "focus", "blur"]);
const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
// const clear = () => emit("input", "");
const handleFocus = (event) => {
  isActive.value = true;
  emit("focus", event);
};
const handleBlur = (event) => {
  isActive.value = false;
  emit("blur", event);
};

const inputProps = computed(() => ({
  ...(attrs || {}),
  disabled: props.disabled,
  value: props.modelValue,
  class: props.inputClass,
}));
const classes = computed(() => ({
  "is-active": isActive.value,
  "is-disabled": props.disabled,
  "is-error": props.error || props.hint,
}));
</script>
<template>
  <div :class="classes" class="base-input">
    <label>{{ label }}</label>
    <input
      :placeholder="label"
      v-bind="inputProps"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="hint" class="base-input__hint">
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
