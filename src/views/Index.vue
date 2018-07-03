<template lang="pug">
  main
    .main-container(v-bind:class="{blured: $store.getters.cityPopup}")
      .weather
        .weather__wrapper
          h1.weather__title Прогноз погоды
          .weather__city г. {{$store.getters.cityName}}
          .weather__temp
            .weather-temp
              .weather-temp__main
                .weather-temp__title Температура:
                .weather-temp__num {{this.$store.state.forecast.temp}} <sup>o</sup>c
              .weather-temp__details
                .weather-temp__row
                  .weather-temp__col
                    .weather-temp__num.little.min {{this.$store.state.forecast.temp_min}} <sup>o</sup>c
                    .weather-temp__desc Мин.
                  .weather-temp__col
                    .weather-temp__num.little.max {{this.$store.state.forecast.temp_max}} <sup>o</sup>c
                    .weather-temp__desc Макс.
          .weather__buttons
            .weather__button.btn(@click="refresh($event)") Обновить
            .weather__button.btn(@click="$store.commit('showCityPopup', true)") Изменить город
    CityPopup
    preloader
</template>

<script>
// @ is an alias to /src
import CityPopup from '@/components/cityPopup.vue'
import preloader from '@/components/preloader.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    CityPopup,
    preloader
  },
  data () {
    return {
      // forecast: ''
    }
  },
  created () {
    this.checkSavedCity()
  },
  methods: {
    checkSavedCity: function () {
      let savedCity = localStorage.getItem('grailUserCity')
      if (savedCity !== null) {
        this.$store.dispatch('saveCityName', savedCity)
        this.$store.dispatch('getForecast', savedCity)
      } else {
        this.getBrowserLocation()
      }
    },
    getBrowserLocation: function () {
      let t = this
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
      } else {
        // открыть попап поиска города
        t.$store.commit('showCityPopup', true)
      }
      function success (position) {
        t.getCity(position)
      }
      function error () {
        t.$store.commit('showCityPopup', true)
      }
    },
    getCity: function (position) {
      axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true`)
        .then(response => {
          let city = response.data.results[0].formatted_address.split(', ')[2]
          localStorage.setItem('grailUserCity', city)
          this.$store.dispatch('saveCityName', city)
          this.$store.dispatch('getForecast', city)
        })
        .catch(e => {
          console.log(e)
        })
    },
    refresh: function () {
      this.$store.dispatch('getForecast', this.$store.getters.cityName)
    }
  }
}
</script>

<style media="screen" lang="scss">
  main{
    height: 100%;
  }
  .main-container{
    height: 100%;
    width: 768px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    filter: blur(0px);
    will-change: filter;
    &.blured{
      filter: blur(5px);
    }
  }
  .weather{
    &__wrapper{
      text-align: center;
    }
    &__title{
      font-weight: 400;
      text-transform: uppercase;
      font-size: 20px;
    }
    &__city{
      margin-top: 10px;
    }
    &__temp{
      margin-top: 20px;
    }
    &__buttons{
      display: flex;
    }
    &__button{
      margin: 20px 10px 0;
    }
  }
  .weather-temp{
    &__main{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__title{
      font-size: 20px;
      margin-right: 10px;
    }
    &__row{
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
    &__col{
      margin: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &__num{
      font-weight: bold;
      font-size: 22px;
      &.little{
        font-size: 18px;
      }
      &.min{
        color: #00CECB;
      }
      &.max{
        color: #FF5E5B;
      }
    }
  }
</style>
