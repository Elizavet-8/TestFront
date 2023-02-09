<template>
  <section id="main" class="main">
    <div class="container">
      <div class="main__row">
        <AppButton class="main__btn"
                   color="bg-blue"
                   @action="$store.commit({type: 'showPopup', city_id: 1})"
        >
          Заказать в Москву
        </AppButton>
        <AppButton class="main__btn"
                   color="bg-mint"
                   @action="$store.commit({type: 'showPopup', city_id: 2})"
        >
          Заказать в Санкт-Петербург
        </AppButton>
      </div>
    </div>
    <FormPopup></FormPopup>
  </section>
</template>

<script>
import AppButton from "@/components/AppButton";
import FormPopup from "@/components/Form/FormPopup";
import FormResult from "@/components/Form/FormResult";

export default {
  name: 'App',
  components: {
    AppButton,
    FormPopup,
    FormResult,
  },
  methods: {
    showPopup() {
      this.$store.commit('showPopup')
    },
  }
}
</script>

<style lang="scss">
@import "scss/main.scss";

.main {
  &__row {
    @apply flex;
  }

  &__btn {
    @apply mr-[2rem] last:mr-0;
  }
}

@media only screen and (max-width: 428px) {
  .main {
    &__row {
      @apply flex-col;
    }

    &__btn {
      @apply mr-0 mb-[1.5rem] last:mb-0;
    }
  }
}

</style>
