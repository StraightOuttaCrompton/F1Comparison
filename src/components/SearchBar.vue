<template>
    <div class="searchBarContainer">
        <input v-model="inputString" @focus="showResults" @blur="hideResults" type="text" v-bind:placeholder="placeholder" autocomplete="off">
        <div class="results">
            <slot></slot>
        </div>
    </div>

</template>

<script>
    import EventBus from '../eventbus.js'
    let resultsElement = null;
    let self = this;
    export default {
        name: 'search-bar',
        props: ['placeholder'],
        components: {},
        data() {
            return {
                inputString: '',
            }
        },
        watch: {
            inputString: function () {
                this.$emit('inputStringUpdated', this.inputString)
            }
        },
        methods: {
            showResults: function () {
            },
            hideResults: function () {
            },
        }
  }
</script>

<style scoped>
    .searchBarContainer {
        position: relative;
    }

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
        transition: width 0.1s ease-in-out;
    }

    input[type=text]:focus {
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
        background-color: red;
        z-index: 10;
    }
</style>