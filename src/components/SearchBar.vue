<template>
    <div class="searchBarContainer">
        <input v-model="input" type="search" v-bind:id="id" v-bind:placeholder="placeholder" autocomplete="off">
        <div v-if="input != ''" class="results">
            <loader v-if="!searchspace || searchspace.length == 0"></loader>
            <div class="driver" v-for="item in searchspace" @click="selectItem(item)">
                <div>{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from './Loader.vue'
    let resultsElement = null;
    export default {
        name: 'search-bar',
        props: ['placeholder','id', 'searchspace'],
        components: {
            'loader': Loader
        },
        data() {
            return {
                input: '',
            }
        },
        watch: {
            input: function () {

            }
        },
        methods: {
            selectItem: function (item) {
                this.input = "";
                this.$emit('itemSelected', item)
                console.log(item);
            },
        }
    }
</script>

<style scoped>
    .searchBarContainer {
        position: relative;
    }

    input[type=search] {
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
    }

    input[type=search]:focus {
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
        z-index: 0;
        height: 400px;
        opacity: 0;
        background-color: #fcfcfc;
    }

    input[type=search]:focus + .results {
        z-index: 100;
        opacity: 1;
    }
    
    .driver {
        display: flex;
        justify-content: center;
        width: 100%;
        min-width: 275px;
        cursor: pointer;
        margin: 0px;
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
</style>