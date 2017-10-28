// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
/*jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import {
  Driver
} from './classes/driver';

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
});

var convert = require('xml-js');

function getDrivers(cb) {
  axios.get('http://ergast.com/api/f1/drivers')
    .then(function (response) {
      var _drivers = [];
      var xml = response.data;
      var ob = JSON.parse(convert.xml2json(xml, {
        compact: true,
        spaces: 4
      }));
      ob.MRData.DriverTable.Driver.forEach(function (driver) {
        var _driver = new Driver(driver);
        _drivers.push(_driver);
      }, this);
      cb(_drivers);

    })
    .catch(function (error) {
      console.log(error);
    });
}

getDrivers(function (_drivers) {
  //console.log(_drivers);
});