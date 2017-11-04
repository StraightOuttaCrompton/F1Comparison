<template>
    <div class="middleContent">
        <div class="inner">

            <div class="middleContentItem">
                <input v-model="inputString" type="search" v-bind:placeholder="placeholder" autocomplete="off">
                <ul class="results">
                    <li v-for="driver in drivers">
                        <a href="javascript:void(0);" onclick="alert('hello');">{{driver.givenName}}</a>
                    </li>
                </ul>
            </div>
            <!-- <div class="middleContentItem">
                <search-bar placeholder="Search for drivers..." @inputStringUpdated="val => driverInputString = val">
                    <li class="driver" v-for="driver in drivers">
                        <div  @click="selectDriver(driver)">{{driver.givenName}}</div>
                    </li>
                </search-bar>

                <search-bar id="circuitSearchbar" placeholder="Search for circuits..." @inputStringUpdated="val => circuitInputString = val">
                </search-bar>
            </div> -->
            <div class="middleContentItem">
                <selected-drivers></selected-drivers>
            </div>
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
        data() {
            return {
                driverInputString: "",
                circuitInputString: "",
                drivers: []
            }
        },
        watch: {
            driverInputString: function () {
                //(this.driverInputString);
            },
            circuitInputString: function () {
                //console.log(this.circuitInputString);
            }
        },
        events: {
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
            selectDriver: function (driver) {
              this.inputString = "";
              console.log(driver);
              //EventBus.$emit('driver_selected', driver);
            }
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


    .searchBarContainer {
        position: relative;
    }

    input[type=search] {
        width: 200px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: white;
        background-image: url('../../images/searchicon.png');
        background-position: 10px 10px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.1s ease-in-out;
    }

    input[type=search]:focus {
        width: 40%;
    }
    input[type="search"]::-webkit-input-placeholder{
    color:#b1e0de;
    }
    input[type="search"]:-moz-placeholder { /* Firefox 18- */
        color: #b1e0de;
    }
    input[type="search"]::-moz-placeholder {  /* Firefox 19+ */
        color: #b1e0de;
    }
    input[type="search"]:-ms-input-placeholder {  /* interner explorer*/
        color: #b1e0de;
    }

    .results {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        top: 50px;
        overflow: auto;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 40%;
        transition: 0.1s ease-in-out;
        z-index: 10;
        background-color: red;
    }
    .results li{
        overflow:hidden;
        height:0;
        -webkit-transition:all 0.3s ease-in-out;
        -moz-transition:all 0.3s ease-in-out;
        -o-transition:all 0.3s ease-in-out;
        transition:all 0.3s ease-in-out;
    }

    input[type="search"]:focus + .results li{
        height:63px;
    }






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
