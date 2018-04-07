import Vue from 'vue';
import App from './App.vue';
import storage from './storage';

window.storage = storage;

new Vue({
    el: '#app',
    render: h => h(App)
});
