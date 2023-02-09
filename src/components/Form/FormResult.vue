<template>
  <AppPopup>
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
export default {
  name: "FormResult"
}
</script>

<style scoped>

</style>