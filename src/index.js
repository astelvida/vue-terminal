import Vue from 'vue'
import Terminal from './Terminal.vue'

export default {
  install (Vue, options = {}) {
    Vue.component('vue-terminal', Terminal)
  }
}
