<template>
  <div class="middleContent">
    <div class="inner">
      <div class="middleContentItem">
        <search-bar id="driverSearchbar" placeholder="Search for drivers..." @inputStringUpdated="val => driverInputString = val">
          <li class="driver" v-for="driver in drivers" @click="selectDriver(driver)">
            <div  class="driverContainer">
              <div class="item">Name: {{ driver.givenName }} {{ driver.familyName }}</div>
              <div class="item">dateOfBirth: {{ driver.dateOfBirth }}</div>
              <div class="item">nationality: {{ driver.nationality }}</div>
              <div class="item">Index: {{ driver.driverIndex }}</div>
              <a class="item" :href="driver.url" target="_blank">More Info</a>
            </div>
          </li>
        </search-bar>
        <search-bar id="circuitSearchbar" placeholder="Search for circuits..." @inputStringUpdated="val => circuitInputString = val">
        </search-bar>
      </div>
      <div class="middleContentItem"><selected-drivers></selected-drivers></div>
    </div>
  </div>
</template>

<script>
  import SearchBar from './SearchBar.vue'
  import SelectedDrivers from './SelectedDrivers.vue'
  import config from '../config.js'
  export default {
    name: 'middleContent',
    components: {
      'search-bar': SearchBar,
      'selected-drivers': SelectedDrivers
    },
    data () {
      return {
        driverInputString: "",
        circuitInputString: "",
      }
    },
    watch: {
      driverInputString: function() {
        console.log(this.driverInputString);
      },
      circuitInputString: function() {
        console.log(this.circuitInputString);
      }
    },
    events:{
      // 'driver_selected' : function(driver){
      //   this.$broadcast('driver_selected', driver);
      // }
    },
    created: function () {
      let self = this;
      axios.get(config.f1BaseUrl + '/drivers.json?limit=1000')
      .then(function (response) {
          self.drivers = response.data.MRData.DriverTable.Drivers;
          console.log(self.drivers);
      })
      .catch(function (error) {
          console.error(error);
      });
    },
    methods: {
      // selectDriver: function (driver) {
      //   this.inputString = "";
      //   EventBus.$emit('driver_selected', driver);
      // },
      // searchDrivers: function () {
      //   this.indexDrivers();
      //   this.sortDriversByIndex();
      // },
      // /* TODO
      // * Add indexing for longest consecutive matching string
      // */
      // indexDrivers: function () {
      //   let self = this;
      //   this.drivers.forEach(function(driver) {
      //     let inputWords = self.inputString.split(" ");
      //     let minIndex = 1000;
      //     let firstNameDistance, secondNameDistance;
      //     let driverFirstName = driver.givenName.toLowerCase();
      //     let driverSecondName = driver.familyName.toLowerCase();
      //     inputWords.forEach(function(input) {
      //       if (input == "") return;
      //       input = input.toLowerCase();
      //       let currentIndex = 1000;
      //       if(driverFirstName.startsWith(input)) currentIndex = 1;
      //       if(driverSecondName.startsWith(input)) currentIndex = 1;
      //       if(driverFirstName.includes(input)) {
      //         if (currentIndex > 2) {
      //           currentIndex = 2;
      //         }
      //       }
      //       if(driverSecondName.includes(input)) {
      //         if (currentIndex > 2) {
      //           currentIndex = 2;
      //         }
      //       }

      //       firstNameDistance = getEditDistance(input, driverFirstName);
      //       secondNameDistance = getEditDistance(input, driverSecondName);
      //       if (firstNameDistance < currentIndex || secondNameDistance < currentIndex) {
      //         currentIndex = Math.min(firstNameDistance, secondNameDistance);
      //       }
      //       if (currentIndex < minIndex) {
      //         minIndex = currentIndex;
      //       }
      //     });
      //     driver.driverIndex = minIndex;
      //   });
      // },
      // sortDriversByIndex: function () {
      //   this.drivers.sort(function(a, b) {
      //     let i = a.driverIndex - b.driverIndex;
      //     if (i == 0) {
      //       if(a.familyName < b.familyName) return -1;
      //       if(a.familyName > b.familyName) return 1;
      //       return 0;
      //     }
      //     return i;
      //   });
      // }
    }
  }
</script>

<style scoped>
  .middleContent {
    display: flex;
    justify-content: center;
    flex: 1;
  }
    .inner {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    border: 1px solid #f1f1f1;
    background-color: #ffffff;
    }
  .middleContentItem:nth-child(n) {
    margin-top: 25px;
  }
  .driver {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 275px;
    cursor: pointer;
    margin: 0px;
    background-color: #fcfcfc;
    border: 1px solid #c7c7c7;
  }
  .driver:nth-child(n) {
    flex: 1;
  }
  .driver:hover {
    background-color: rgba(197, 202, 233, 1);
  }
  .driverContainer {
    width: 50%;
    text-align: start;
    padding: 25px 15px;
  }
  .item {
    padding: 5px;
    line-height: 20px;
  }
</style>
