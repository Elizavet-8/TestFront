<template>
  <AppPopup v-if="$store.state.isPopupVisible" @action="$store.commit('showPopup')">
    <template v-slot:popup__title>
      Заказать звонок
    </template>
    <template v-slot:popup__body>
      <form class="popup__form"
            @submit.prevent="createOrder"
            novalidate="true">
        <FormGroup
            class="popup__form-group"
            inputType="text"
            inputPlaceholder="Иван Иванов"
            inputLabel="Имя"
            v-model="$store.state.name"
            :error="errors.name"
        ></FormGroup>
        <FormGroup
            class="popup__form-group"
            inputLabel="Телефон"
            :error="errors.phone"
        >
          <template v-slot:customInput>
            <input class="form-input"
                   v-model="$store.state.phone"
                   placeholder="+7 (___) ___-__-__"
                   type="tel"
                   v-mask="'+7 (###) ###-##-##'"
            />
          </template>
        </FormGroup>
        <FormGroup
            class="popup__form-group"
            inputType="email"
            inputPlaceholder="you@example.com"
            inputLabel="Email"
            v-model="$store.state.email"
            :error="errors.email"
        ></FormGroup>
        <FormGroup
            class="popup__form-group popup__form-group_select"
            inputLabel="Город"
            :error="errors.city_id"
        >
          <template v-slot:customInput>
            <select class="popup__select" v-model="$store.state.city_id">
              <option v-for="option in city_ids" :value="option.id">{{ option.name }}</option>
            </select>
          </template>
        </FormGroup>
        <AppButton
            class="popup__btn"
            color="bg-mint"
            typeBtn="submit"
        >
          Отправить
        </AppButton>
      </form>
    </template>
  </AppPopup>
  <FormResult></FormResult>
  <AppError :error="errorForm"></AppError>
</template>

<script>
import axios from 'axios';
import AppPopup from "@/components/AppPopup";
import AppButton from "@/components/AppButton";
import FormResult from "@/components/Form/FormResult";
import AppError from "@/components/AppError";
import FormGroup from "@/components/Form/FormGroup";
import {mask} from 'vue-the-mask';

export default {
  name: "FormPopup",
  directives: {
    mask,
  },
  components: {
    AppButton,
    FormGroup,
    AppPopup,
    FormResult,
    AppError,
  },
  data() {
    return {
      errorForm: '',
      city_ids: [
        {
          id: 1,
          name: "Москва"
        },
        {
          id: 2,
          name: "Санкт-Петербург"
        },
        {
          id: 3,
          name: "Казань"
        }
      ],
      errors: {
        name: null,
        phone: null,
        email: null,
        city_id: null,
      },
    }
  },
  methods: {
    createOrder() {
      if (!this.$store.state.name) {
        this.errors.name = 'Обязательно поле';
      } else {
        this.errors.name = null;
      }
      if (!this.$store.state.phone) {
        this.errors.phone = 'Обязательно поле'
      } else if (!this.validPhone(this.$store.state.phone)) {
        this.errors.phone = 'Укажите корректный номер'
      }
      if (!this.$store.state.email) {
        this.errors.email = 'Обязательно поле'
      } else if (!this.validEmail(this.$store.state.email)) {
        this.errors.phone = 'Укажите корректный адрес электронной почты.'
      }
      if (!this.$store.state.city_id) {
        this.errors.city_id = 'Обязательно поле'
      }
      if (!this.$store.state.phone) {
        this.errors.push('Обязательно поле');
      } else if (!this.validPhone(this.$store.state.phone)) {
        this.errors.push('Укажите корректный номер.');
      }
      if (!this.$store.state.email) {
        this.errors.push('Обязательно поле');
      } else if (!this.validEmail(this.$store.state.email)) {
        this.errors.push('Укажите корректный адрес электронной почты.');
      }
      if (!this.$store.state.city_id) {
        this.errors.push('Обязательно поле');
      }

      if (!this.errors.name && !this.$store.state.email && !this.$store.state.city_id && !this.$store.state.phone) {
        axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
            {
              name: this.$store.state.name,
              phone: '+' + this.$store.state.phone.replace(/\D/g, ""),
              email: this.$store.state.email,
              city_id: this.$store.state.city_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
            })
            .then((response) => {
              console.log(response)
              this.$store.commit('showPopupResult')
            })
            .catch(error => {
              this.errorForm = error;
              this.$store.commit('showPopupError')
            });
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone: function (phone) {
      var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return re.test(phone);
    }
  }
}
</script>

<style lang="scss">
@import 'vue-select/dist/vue-select.css';

.popup {
  &__form {
    @apply grid grid-cols-4 mx-[-1rem] mt-[2.3rem];
  }

  &__btn {
    @apply last:mr-[1rem] ml-auto mt-[1.8rem] col-start-4;
  }

  &__select {
    @apply appearance-none block
    bg-white-100 bg-clip-padding bg-no-repeat
    rounded transition ease-in-out m-0 focus:outline-none
    text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full
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

@media only screen and (max-width: 744px) {
  .popup {
    &__form {
      @apply grid grid-cols-3 mx-[-1.3rem] mt-[1.9rem];
    }

    &__btn {
      @apply last:mr-[1rem] ml-auto mt-[1.8rem] col-start-3 w-full mt-auto mb-0;
    }

    &__form-group {
      @apply mb-[2rem];
      &_select {
        @apply col-start-1 col-end-3 mb-0;
      }
    }
  }
}

@media only screen and (max-width: 744px) {
  .popup {
    &__form {
      @apply grid-cols-3 mt-[2.9rem];
    }

    &__btn {
      @apply col-start-3 w-full mt-auto mb-0;
    }

    &__form-group {
      @apply mb-[2rem];
      &_select {
        @apply col-start-1 col-end-3 mb-0;
      }
    }
  }
}

@media only screen and (max-width: 428px) {
  .popup {
    &__form {
      @apply grid-cols-1 mx-[0] mt-[3.6rem];
    }

    &__btn {
      @apply col-start-1 mb-[2rem];
    }

    &__form-group {
      @apply px-0;
      &_select {
        @apply col-start-1 col-end-2 mb-[2rem];
      }
    }
  }
}
</style>