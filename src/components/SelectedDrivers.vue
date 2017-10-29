<template>
    <div class="selectedDrivers">
        <div class="results" >
            <li class="driver" v-for="driver in drivers">
                <div  class="driverContainer">
                    <div class="item">Name: {{ driver.givenName }} {{ driver.familyName }}</div>
                    <div class="item">dateOfBirth: {{ driver.dateOfBirth }}</div>
                    <div class="item">nationality: {{ driver.nationality }}</div>
                    <a class="item" :href="driver.url" target="_blank">More Info</a>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
    import EventBus from '../eventbus.js'
    export default {
        name: 'selectedDrivers',
        data() {
            return  {
                drivers: []
            }
        },
        mounted: function () {
            var self = this;
            EventBus.$on('driver_selected', function (driver) {
                self.addDriver(driver);
            })
        },
        methods: {
            addDriver: function (driver) {
                console.log('added driver');
                this.drivers.push(driver);
            }
            
        }
    }
</script>

<style scoped>
    .selectedDrivers {
        display: flex;
        flex-wrap: wrap;
    }
    .selectedDrivers:nth-child(n) {
        flex: 1;
    }
    .results {
        display: flex;
        flex-wrap: wrap;    
    }
    .driver {
        display: flex;
        justify-content: center;
        width: 100%;
        min-width: 300px;
        margin: 0px;
        background-color: red;
    }
    .driver:nth-child(n) {
        flex: 1;
    }
    .driver:hover {
        background-color: rgba(197, 202, 233, 0.41);
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