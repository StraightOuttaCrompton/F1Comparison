<template>
    <div class="middleContent flex column center">
        <div class="inner flex column">
            <div class="middleContentItem">
                <search-bar id="DriverSearchBar" placeholder="Search for drivers..." :input-string="driverInputString" :resultsarray="drivers" @inputStringUpdated="val => driverInputString = val">

                </search-bar>
                <!-- <search-bar id="CircuitSearchBar" placeholder="Search for circuits..." :input-string="circuitInputString" :resultsarray="circuits" @inputStringUpdated="val => circuitInputString = val">
                    <li slot="results" class="driver" v-for="circuit in circuits">
                        <div>{{circuit.circuitName}}</div>
                    </li>
                </search-bar>
                <search-bar id="TeamSearchBar" placeholder="Search for teams..." :input-string="teamInputString" :resultsarray="teams" @inputStringUpdated="val => teamInputString = val">
                    <li slot="results" class="driver" v-for="team in teams">
                        <div>{{team}}</div>
                    </li>
                </search-bar> -->
            </div>
            <div class="middleContentItem">
                <selected-drivers :drivers="selectedDrivers"></selected-drivers>
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
                drivers: [],
                selectedDrivers: [],
                circuitInputString: "",
                circuits: [],
                selectedCircuits: [],
                teamInputString: "",
                teams: [],
                selectedTeams: []
            }
        },
        watch: {
            driverInputString: function () {
                this.searchDrivers();
            },
            circuitInputString: function () {
                this.searchCircuits();
            },
            teamInputString: function () {
                console.log(this.teamInputString);
            }
        },
        created: function () {
            let self = this;
            axios.get(config.f1BaseUrl + '/drivers.json?limit=1000')
                .then(function (response) {
                    self.drivers = response.data.MRData.DriverTable.Drivers;
                })
                .catch(function (error) {
                    console.error(error);
                });
            axios.get(config.f1BaseUrl + '/circuits.json?limit=1000')
                .then(function (response) {
                    self.circuits = response.data.MRData.CircuitTable.Circuits;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        methods: {
            selectDriver: function (driver) {
                this.driverInputString = "";
                this.selectedDrivers.push(driver);
                console.log(driver);
            },
            searchDrivers: function () {
                this.indexDrivers();
                this.sortDriversByIndex();
            },
            searchCircuits: function () {
                this.indexCircuits();
                this.sortCircuitsByIndex();
            },
            indexDrivers: function () {
                let self = this;
                let inputWords = self.driverInputString.split(" ");
                this.drivers.forEach(function (driver) {
                    let driverFirstName = driver.givenName.toLowerCase();
                    let driverSecondName = driver.familyName.toLowerCase();
                    driver.driverIndex = self.getIndex(inputWords, [driverFirstName, driverSecondName]);;
                });
            },
            indexCircuits: function () {
                let self = this;
                let inputWords = self.circuitInputString.split(" ");
                this.circuits.forEach(function (circuit) {
                    console.log(circuit.circuitName);
                    circuit.circuitIndex = self.getIndex(inputWords, circuit.circuitName.split(" "));;
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
            },
            sortCircuitsByIndex: function () {
                this.circuits.sort(function (a, b) {
                    let i = a.circuitIndex - b.circuitIndex;
                    if (i == 0) {
                        if (a.circuitName < b.circuitName) return -1;
                        if (a.circuitName > b.circuitName) return 1;
                        return 0;
                    }
                    return i;
                });
            },
            /* TODO
             * Add indexing for longest consecutive matching string
             */
            getIndex: function (inputWords, comparisonWords) {
                let minIndex = 1000;
                inputWords.forEach(function (inputWord) {
                    if (inputWord == "") return;
                    inputWord = inputWord.toLowerCase();
                    let currentIndex = 1000;

                    comparisonWords.forEach(function (comparisonWord) {
                        comparisonWord = comparisonWord.toLowerCase();

                        if (comparisonWord.startsWith(inputWord)) currentIndex = 1;
                        if (comparisonWord.includes(inputWord)) {
                            if (currentIndex > 2) {
                                currentIndex = 2;
                            }
                        }
                        let inputWordDistance = getEditDistance(inputWord, comparisonWord);
                        if (inputWordDistance < currentIndex) {
                            currentIndex = inputWordDistance;
                        }
                        if (currentIndex < minIndex) {
                            minIndex = currentIndex;
                        }
                    });
                });
                return minIndex;
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
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }
        return matrix[b.length][a.length];
    };
</script>

<style scoped>
    .middleContent {
        flex: 1;
    }

    .inner {
        flex: 1;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        border: 1px solid #f1f1f1;
        background-color: #ffffff;
    }

    .middleContentItem {
        padding: 25px;
        width: 100%;
    }
</style>
