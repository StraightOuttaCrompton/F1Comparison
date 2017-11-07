<template>
    <div class="searchBarContainer">
        <input v-model="input" type="search" v-bind:id="id" v-bind:placeholder="placeholder" autocomplete="off">
        <ul v-if="input != ''" class="results">
            <loader v-if="!resultsarray || resultsarray.length == 0"></loader>
            <slot name="results"></slot>
        </ul>
    </div>
</template>

<script>
    import Loader from './Loader.vue'
    let resultsElement = null;
    export default {
        name: 'search-bar',
        props: ['placeholder','id', 'inputString', 'resultsarray'],
        components: {
            'loader': Loader
        },
        data() {
            return {
                input: this.$props.inputString,
            }
        },
        methods: {
            showLoader: function () {
                console.log(this.resultsArray);
                return true;
            }
        },
        watch: {
            input: function () {
                this.$emit('inputStringUpdated', this.input)
            },
            inputString: function () {
                if (this.$props.inputString == "") {
                    this.input = "";
                }
                console.log(this.resultsarray);
            },
            resultsarray: function () {
                console.log(this.resultsarray);
            }
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
        z-index: 10;
        height: 400px;
        opacity: 0;
        background-color: #fcfcfc;
    }

    input[type=search]:focus + .results {
        opacity: 1;
    }
</style>