// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
/*jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';

new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: (h) => h(App)
});

// Vue.directive('openresults', {
//     bind(el, binding, vnode) {
//         if (binding.value) {
//             el.style.height = "400px";
//             el.style.opacity = "1";
//         } else {
//             //Timeout is so that the results are still open to be clicked
//             setTimeout(function () {
//                 el.style.height = "0px";
//                 el.style.opacity = "0";
//             }, 20);
//         }
//     }
// })