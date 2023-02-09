<template>
  <AppPopup v-if="$store.state.isPopupErrorVisible" @action="$store.commit('showPopupError')">
    <template v-slot:popup__title>
      Ошибка!
    </template>
    <template v-slot:popup__body>
      <div>{{ error }}</div>
    </template>
  </AppPopup>
</template>

<script>
import AppPopup from "@/components/AppPopup";

export default {
  name: "AppError",
  components: {
    AppPopup
  },
  props: {
    error: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>

</style>