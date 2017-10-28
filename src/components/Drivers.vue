<template>
    <div class="driversContainer" >
        <li class="driver" v-for="driver in driversArray">
            <div class="driverContainer">
                <div class="driverId">driverId: {{ driver.driverId }}</div>
                <div class="firstName">firstName: {{ driver.firstName }}</div>
                <div class="familyName">familyName: {{ driver.familyName }}</div>
                <div class="dateOfBirth">dateOfBirth: {{ driver.dateOfBirth }}</div>
                <div class="nationality">nationality: {{ driver.nationality }}</div>
            </div>
        </li>
        
    </div>
</template>

<script>
    import config from '../config'
    export default {
        name: 'drivers',
        data () {
            return  {
                driversArray: [],
                loaded: false
            }
        },
        methods: {
            
        },
        created: function () {
            var convert = require('xml-js');
            var self = this;
            axios.get(config.f1BaseUrl + '/drivers.json?limit=1000')
            .then(function (response) {
                self.driversArray = response.data.MRData.DriverTable.Drivers;
                self.loaded = true;
            })
            .catch(function (error) {
                console.error(error);
            });
        }
    }
</script>

<style scoped>
    .driversContainer {
        display: flex;
        flex-wrap: wrap;
    }
    .driversContainer:nth-child(n) {
        flex: 1;
    }
    .driver {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .driver:nth-child(n) {
        flex: 1;
    }
    .driverContainer {
        margin: 15%;
        min-width: 200px;
    }
</style>
