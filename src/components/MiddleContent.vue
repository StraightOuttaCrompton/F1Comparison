<template>
    <div class="middleContent">
        <div class="inner">
            <!-- 
            <div class="middleContentItem">
                <div>
                    <input v-model="inputString" type="search" v-bind:placeholder="placeholder" autocomplete="off">
                    <ul class="results">
                        <li v-for="driver in drivers">
                            <a href="javascript:void(0);" v-on:click="selectDriver(driver);">{{driver.givenName}}</a>
                        </li>
                    </ul>
                </div>
            </div> -->
            <div class="middleContentItem">
                <search-bar id="DriverSearchBar" placeholder="Search for drivers..." :input-string="driverInputString" @inputStringUpdated="val => driverInputString = val">
                    <li class="driver" v-for="driver in drivers" @click="selectDriver(driver)">
                        <div>{{driver.givenName}} {{driver.familyName}}</div>
                    </li>
                </search-bar>

            </div>
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
                this.searchDrivers();
            },
            circuitInputString: function () {
                //console.log(this.circuitInputString);
            }
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
                this.driverInputString = "";
                console.log(driver);
                //EventBus.$emit('driver_selected', driver);
            },
            searchDrivers: function () {
              this.indexDrivers();
              this.sortDriversByIndex();
            },
            /* TODO
            * Add indexing for longest consecutive matching string
            */
            indexDrivers: function () {

                let self = this;
                console.log(self.driverInputString);
                this.drivers.forEach(function (driver) {
                    let inputWords = self.driverInputString.split(" ");
                    let minIndex = 1000;
                    let firstNameDistance, secondNameDistance;
                    let driverFirstName = driver.givenName.toLowerCase();
                    let driverSecondName = driver.familyName.toLowerCase();
                    inputWords.forEach(function (input) {
                        if (input == "") return;
                        input = input.toLowerCase();
                        let currentIndex = 1000;
                        if (driverFirstName.startsWith(input)) currentIndex = 1;
                        if (driverSecondName.startsWith(input)) currentIndex = 1;
                        if (driverFirstName.includes(input)) {
                            if (currentIndex > 2) {
                                currentIndex = 2;
                            }
                        }
                        if (driverSecondName.includes(input)) {
                            if (currentIndex > 2) {
                                currentIndex = 2;
                            }
                        }

                        firstNameDistance = getEditDistance(input, driverFirstName);
                        secondNameDistance = getEditDistance(input, driverSecondName);
                        if (firstNameDistance < currentIndex || secondNameDistance < currentIndex) {
                            currentIndex = Math.min(firstNameDistance, secondNameDistance);
                        }
                        if (currentIndex < minIndex) {
                            minIndex = currentIndex;
                        }
                    });
                    driver.driverIndex = minIndex;
                });
            },
            sortDriversByIndex: function () {
                this.drivers.sort(function (a, b) {
                    let i = a.driverIndex - b.driverIndex;
                    if (i == 0) {
                        if (a.familyName < b.familyName) return -1;
                        if (a.familyName > b.familyName) return 1;
                        return 0;
                    }
                    return i;
                });
            }
        }
    }
    // Compute the edit distance between the two given strings
    function getEditDistance(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a.length === 0) return b.length; 
        if (b.length === 0) return a.length;
        var matrix = [];
        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i-1) == a.charAt(j-1)) {
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                            Math.min(matrix[i][j-1] + 1, // insertion
                                                    matrix[i-1][j] + 1)); // deletion
                }
            }
        }
        return matrix[b.length][a.length];
    };
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
        padding: 10px;
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
