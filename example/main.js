import Vue from 'vue'
import Terminal from '../src/index'
import storage from '../src/utils/storage'
import Example from './Example'

window.storage = storage

Vue.use(Terminal)

new Vue({
  el: '#app',
  render: h => h(Example)
})
