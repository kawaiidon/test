import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityName: '',
    cityPopup: false,
    preloader: false,
    forecast: {}
  },
  mutations: {
    preloader (state, amount) {
      state.preloader = amount
    },
    cityName (state, amount) {
      state.cityName = amount
    },
    showCityPopup (state, amount) {
      state.cityPopup = amount
    },
    saveForecast (state, amount) {
      state.forecast = amount
    }
  },
  actions: {
    showPreloader (context, show) {
      context.commit('preloader', show)
    },
    saveCityName (context, city) {
      context.commit('cityName', city)
    },
    getForecast (context, city) {
      context.commit('preloader', true)
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},ru&appid=58dd24b701746e92ffd5d38c2c54678c&units=metric`
      axios.get(url)
        .then(response => {
          // JSON responses are automatically parsed.
          context.commit('saveForecast', response.data.main)
          context.commit('showCityPopup', false)
          context.commit('preloader', false)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  getters: {
    preloader: state => {
      return state.preloader
    },
    cityName: state => {
      return state.cityName
    },
    cityPopup: state => {
      return state.cityPopup
    },
    forecast: state => {
      return state.forecast
    }
  }
})
