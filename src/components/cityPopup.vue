<template lang="pug">
  .popup(v-if="$store.getters.cityPopup")
    .popup__close-btn(@click="$store.commit('showCityPopup', false)")
    .popup__wrapper
      .popup__title Изменить город
      vue-google-autocomplete(id="map" classname="form-control" placeholder="Город"
    v-on:placechanged="getCityName" types="(cities)" country="ru" ref="cityInput").popup__input
      .popup__button.btn(@click="changeCity()" v-bind:class="{disabled: checkCity()}") Сохранить
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: 'cityPopup',
  components: {
    VueGoogleAutocomplete
  },
  data () {
    return {
      newCity: ''
    }
  },
  computed: {
    city: function () {
      return this.newCity
    }
  },
  methods: {
    getCityName: function () {
      this.newCity = this.$refs.cityInput.$el.value.split(',')[0]
    },
    checkCity: function () {
      if (this.newCity.length < 1) {
        return true
      } else {
        return false
      }
    },
    changeCity: function () {
      localStorage.setItem('grailUserCity', this.newCity)
      this.$store.dispatch('saveCityName', this.newCity)
      this.$store.dispatch('getForecast', this.newCity)
      this.newCity = ''
    }
  }
}
</script>

<style scoped lang="scss">
  .popup{
    height: 200px;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 10px 40px 0 rgba(0,156,166,.2);
    &__close-btn{
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      cursor: pointer;
      &:before, &:after{
        content: "";
        position: absolute;
        top: calc(50% - 10px);
        left: calc(50% - 1px);
        height: 20px;
        width: 2px;
        background-color: #182234;
      }
      &:before{
        transform: rotate(-45deg);
      }
      &:after{
        transform: rotate(45deg);
      }
    }

    &__input{
      margin-top: 40px;
      width: 100%;
      outline: none;
      border: none;
      border-bottom: 1.5px solid rgba(#FF5E5B, 0.3);
      padding-bottom: 5px;
      font-size: 16px;
      transition: 0.3s;
      &:focus{
        border-bottom: 1.5px solid rgba(#FF5E5B, 0.6);
      }
    }
    &__button{
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }
</style>
