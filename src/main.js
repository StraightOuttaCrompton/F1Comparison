// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
})

var convert = require('xml-js');

axios.get('http://ergast.com/api/f1/2008/5/qualifying')
  .then(function (response) {
  	var xml = response.data;
    //console.log(response.data);

	var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
	var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
	console.log(result1, '\n', result2);
  })
  .catch(function (error) {
    console.log(error);
  });
