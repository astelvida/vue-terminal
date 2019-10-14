import Vue from 'vue'
import Terminal from './components/Terminal'
import storage from './utils/storage'

window.storage = storage

new Vue({
  el: '#app',
  render: h => h(Terminal)
})
