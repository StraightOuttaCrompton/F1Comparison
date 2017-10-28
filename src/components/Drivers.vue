<template>
    <div id="drivers">
        <div class="driver">
            <div class="driverContainer">
                <div class="driverId">driverId</div>
                <div class="wikiURL">wikiURL</div>
                <div class="firstName">firstName</div>
                <div class="familyName">familyName</div>
                <div class="dateOfBirth">dateOfBirth</div>
                <div class="nationality">nationality</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Driver } from '../classes/driver';
    export default {
        name: 'drivers',
        components: {
            Driver,
        },
        data() {
            return  {
                drivers: [],
                loaded: false
            }
        },
        methods: {
            
        },
        created: function () {
            console.log('wasssup');
            var convert = require('xml-js');
            axios.get('http://ergast.com/api/f1/drivers')
            .then(function (response) {
                var xml = response.data;
                var ob = JSON.parse(convert.xml2json(xml, {
                compact: true,
                spaces: 4
                }));

                ob.MRData.DriverTable.Driver.forEach(function (driver) {
                    var _driver = new Driver(driver);
                    this.drivers.push(_driver);
                }, this);

                this.loaded = true;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
</script>

<style scoped>
    #drivers {
        display: flex;
        flex-wrap: wrap;
    }
    #drivers:nth-child(n) {
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
    .driverContainerdr {
        margin: 15%;
        min-width: 200px;
    }
</style>
