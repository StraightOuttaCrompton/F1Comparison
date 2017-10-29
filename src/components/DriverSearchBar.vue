<template>
    <form>
        <input v-model="inputString" type="text" name="search" placeholder="Search for drivers...">
        <drivers ref="drivers" class="middleContentItem"></drivers>
    </form>
</template>

<script>
    import Drivers from './Drivers.vue'
    export default {
        name: 'driverSearchBar',
        components: {
            Drivers
        },
        data () {
            return  {
                inputString: "",
                drivers: []
            }
        },
        watch: {
            inputString: function() {
                this.searchDrivers();
            }
        },
        methods: {
            searchDrivers: function () {
                this.drivers = this.$refs.drivers._data.driversArray;
                this.indexDrivers();
                this.$refs.drivers.sortDriversByIndex();
            },
            indexDrivers: function () {
                var self = this;
                this.drivers.forEach(function(driver) {
                    var inputWords = self.inputString.split(" ");
                    var minIndex = 1000;
                    var firstNameDistance, secondNameDistance;
                    var driverFirstName = driver.givenName.toLowerCase();
                    var driverSecondName = driver.familyName.toLowerCase();
                    if (self.inputString.toLowerCase() == driverFirstName + " " + secondNameDistance) { 
                        //driver.driverIndex = 0; 
                        //return; 
                    }
                    inputWords.forEach(function(input) {
                        if (input == "") return;
                        input = input.toLowerCase();
                        var currentIndex = 1000;
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
                            if (currentIndex > 3) {
                                currentIndex = 3;
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
        transition: width 0.4s ease-in-out;
    }

    input[type=text]:focus {
        width: 100%;
    }
</style>
