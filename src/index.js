import Vue from 'vue'
import TerminalComponent from './components/Terminal.vue'

export default {
  install (Vue, options = {}) {
    Vue.component('vue-terminal', Object.assign({}, TerminalComponent, options))
  }
}
