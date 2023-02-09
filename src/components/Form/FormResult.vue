<template>
  <AppPopup v-if="$store.state.isPopupResultVisible" @action="$store.commit('closePopupResult')">
    <template v-slot:popup__title>
      Ваши данные
    </template>
    <template v-slot:popup__body>
      <div>{{ $store.state.name }}</div>
      <div>{{ $store.state.phone }}</div>
      <div>{{ $store.state.email }}</div>
      <div>{{ $store.state.city_id }}</div>
    </template>
  </AppPopup>
</template>

<script>
import AppPopup from "@/components/AppPopup";

export default {
  name: "FormResult",
  components: {
    AppPopup
  }
}
</script>

<style scoped>

</style>