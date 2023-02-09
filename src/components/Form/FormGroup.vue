<template>
  <div class="form-group">
    <label class="form-label" :for="id">
      {{ inputLabel }}
      <span v-if="inputRequired">*</span>
    </label>
    <slot name="customInput"></slot>
    <template v-if="!$slots.customInput">
      <input class="form-input"
             :type="inputType"
             :id="id"
             :placeholder="inputPlaceholder"
             :value="modelValue"
             @input="onChange"
      >
    </template>
    <small v-if="error">{{ error }}</small>
  </div>
</template>

<script>

export default {
  name: "AppFormGroup",
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: String,
    error: String,
    inputType: {
      type: String,
      default: 'text',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: 'input-' + Math.random()
    }
  },
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.form {
  &-group {
    @apply px-[1rem];
  }

  &-label {
    @apply block text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full mb-[4px];
  }

  &-input {
    @apply text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full
    flex items-center justify-center
    py-[.9rem] px-[1.3rem]
    h-[3.8rem] rounded-[.6rem]
    bg-white-100
    shadow-[0_1px_2px_1px_rgba(0,0,0,0.05)]
    border border-white-100 border-solid
    placeholder:font-normal placeholder:text-[1.6rem] placeholder:leading-[2rem] placeholder:text-gray-200
    focus:font-normal focus:text-[1.6rem] focus:leading-[2rem] focus:text-gray-200;
  }
}
</style>