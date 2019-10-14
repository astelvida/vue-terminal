// import Vue from 'vue'
// import Terminal from './components/Terminal'

// import storage from './utils/storage'

// window.storage = storage

// new Vue({
//   el: '#app',
//   render: h => h(Terminal)
// })


import Vue from 'vue'
import Terminal from './index'
import Example from '../example/Example'

Vue.use(Terminal)

new Vue({
  el: '#app',
  render: h => h(Example)
})
