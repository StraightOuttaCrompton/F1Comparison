<template>
    <div class="drivers" >
        <li class="driver" v-for="driver in driversArray">
            <div class="driverContainer">
                <div class="item">driverId: {{ driver.driverId }}</div>
                <div class="item">firstName: {{ driver.firstName }}</div>
                <div class="item">familyName: {{ driver.familyName }}</div>
                <div class="item">dateOfBirth: {{ driver.dateOfBirth }}</div>
                <div class="item">nationality: {{ driver.nationality }}</div>
            </div>
        </li>
        <loader v-if="!loaded"></loader>
        
    </div>
</template>

<script>
    import config from '../config'
    import Loader from './Loader.vue'
    export default {
        name: 'drivers',
        components: {
            Loader
        },
        data () {
            return  {
                driversArray: [],
                loaded: false
            }
        },
        methods: {
            
        },
        created: function () {
            var self = this;
            axios.get(config.f1BaseUrl + '/drivers.json?limit=100')
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
    .drivers {
        display: flex;
        flex-wrap: wrap;
    }
    .drivers:nth-child(n) {
        flex: 1;
    }
    .driver {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-width: 300px;
    }
    .driver:nth-child(n) {
        flex: 1;
    }
    .driverContainer {
        margin: 5%;
        padding: 20px 10px;    
        border: 1px solid #c7c7c7;
        border-radius: 6px;
		background-color: #E8EAF6;
    }
    .item {
        padding: 5px;
    }
</style>
