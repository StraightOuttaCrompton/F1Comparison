<template>
    <form>
        <div class="driverSearchBarContainer"> 
            <input v-model="inputString" @focus="driversSearchFocus" @blur="driversSearchBlur" type="text" placeholder="Search for drivers..." autocomplete="off" autofocus >
            <div id="results" class="results">
                <li class="driver" v-for="driver in drivers" @click="selectDriver(driver)">
                    <div  class="driverContainer">
                        <div class="item">Name: {{ driver.givenName }} {{ driver.familyName }}</div>
                        <div class="item">dateOfBirth: {{ driver.dateOfBirth }}</div>
                        <div class="item">nationality: {{ driver.nationality }}</div>
                        <div class="item">Index: {{ driver.driverIndex }}</div>
                        <a class="item" :href="driver.url" target="_blank">More Info</a>
                    </div>
                </li>
                <loader v-if="!loaded && inputString"></loader>
            </div>
        </div>
        
    </form>
</template>


<script>
    import EventBus from '../eventbus.js'
    import config from '../config.js'
    import Loader from './Loader.vue'
    export default {
        name: 'driverSearchBar',
        components: {
            Loader
        },
        data () {
            return  {
                inputString: "",
                drivers: [],
                loaded: false
            }
        },
        watch: {
            inputString: function() {
                this.searchDrivers();
            }
        },
        methods: {
            driversSearchFocus : function () {
                document.getElementById('results').style.height = "400px";
                document.getElementById('results').style.opacity = "1";
            },
            driversSearchBlur : function () {
                setTimeout(function() {
                    document.getElementById('results').style.height = "0px";
                    document.getElementById('results').style.opacity = "0";
                }, 20);
            },
            selectDriver: function (driver) {
                this.inputString = "";
                EventBus.$emit('driver_selected', driver);
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
                this.drivers.forEach(function(driver) {
                    let inputWords = self.inputString.split(" ");
                    let minIndex = 1000;
                    let firstNameDistance, secondNameDistance;
                    let driverFirstName = driver.givenName.toLowerCase();
                    let driverSecondName = driver.familyName.toLowerCase();
                    inputWords.forEach(function(input) {
                        if (input == "") return;
                        input = input.toLowerCase();
                        let currentIndex = 1000;
                        if(driverFirstName.startsWith(input)) {
                            currentIndex = 1;
                        }
                        if(driverSecondName.startsWith(input)) {
                            currentIndex = 1;
                        }
                        if(driverFirstName.includes(input)) {
                            if (currentIndex > 2) {
                                currentIndex = 2;
                            }
                        }
                        if(driverSecondName.includes(input)) {
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
                this.drivers.sort(function(a, b) {
                    let i = a.driverIndex - b.driverIndex;
                    if (i == 0) {
                        if(a.familyName < b.familyName) return -1;
                        if(a.familyName > b.familyName) return 1;
                        return 0;
                    }
                    return i;
                });
            }

        },
        created: function () {
            let self = this;
            axios.get(config.f1BaseUrl + '/drivers.json?limit=1000')
            .then(function (response) {
                self.drivers = response.data.MRData.DriverTable.Drivers;
                self.loaded = true;
            })
            .catch(function (error) {
                console.error(error);
            });
        }
    }

    // Compute the edit distance between the two given strings
    function getEditDistance(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a.length === 0) return b.length; 
        if (b.length === 0) return a.length;

        let matrix = [];

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
    .driverSearchBarContainer {
        position: relative;
    }
    input[type=text] {
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
    input[type=text]:focus {
        width: 40%;
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

