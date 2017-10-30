<template>
    <div class="selectedDrivers">
        <li class="driver" v-for="driver in drivers">
            <div  class="driverContainer">
                <div class="item">Name: {{ driver.givenName }} {{ driver.familyName }}</div>
                <div class="item">dateOfBirth: {{ driver.dateOfBirth }}</div>
                <div class="item">nationality: {{ driver.nationality }}</div>
                <a class="item" :href="driver.url" target="_blank">More Info</a>
            </div>
        </li>
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
    .driver {
        display: flex;
        flex: 1;
        justify-content: center;
        min-width: 400px;
        margin: 0px;
        padding: 15px;
    }
    .driver:nth-child(odd) {
        background-color: red;
    }
    .driver:nth-child(even) {
        background-color: green;
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