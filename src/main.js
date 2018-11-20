import Vue from 'vue'
import Terminal from './Terminal'
import storage from './utils/storage'

window.storage = storage

// Vue.use(Terminal);

new Vue({
  el: '#app',
  render: h => h(Terminal)
})
