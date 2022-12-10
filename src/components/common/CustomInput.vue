<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  error: Object,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const errorMessage = computed(() => props.error?.message);
</script>

<template>
  <div class="form-field">
    <label v-if="label" v-html="label" />
    <input
      type="text"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
    />
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<style lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  & label {
    font-size: 10px;
    text-transform: uppercase;
    padding: 5px 0;
  }
  & input {
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 7.5px;
  }
}
</style>
