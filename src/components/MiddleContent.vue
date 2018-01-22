<template>
    <div class="middleContent flex column center">
        <div class="inner flex column">
            <div class="middleContentItem">
                <search-bar id="DriverSearchBar" 
                            placeholder="Search for drivers..." 
                            v-bind:searchspace="driversSearchSpace" 
                            @itemSelected="val => selectedDrivers.push(val)"> <!-- call function to remove item from drivers array -->
                </search-bar>
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
        },
        data() {
            return {
                drivers: [],
                driversSearchSpace: [],
                selectedDrivers: [],
            }
        },
        created: function () {
            let self = this;
            axios.get(config.f1BaseUrl + '/drivers.json?limit=1000')
                .then(function (response) {
                    self.drivers = response.data.MRData.DriverTable.Drivers;
                    self.setDriverSearchSpace();
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        methods: {
            setDriverSearchSpace: function () {
                let self = this;
                this.drivers.forEach(function (driver) {
                    let driverFullName = driver.givenName + " " + driver.familyName;
                    self.driversSearchSpace.push(driverFullName);
                });
            },
            searchDrivers: function () {
                this.indexDrivers();
                this.sortDriversByIndex();
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
        flex: 1 0 auto;
    }

    .inner {
        flex: 1;
        align-items: center;
        max-width: 1200px;
        width: 100%;
        border: 1px solid #f1f1f1;
        background-color: #ffffff;
        box-sizing: border-box;
    }

    .middleContentItem {
        padding: 25px;
        width: 100%;
        box-sizing: border-box;
    }
</style>