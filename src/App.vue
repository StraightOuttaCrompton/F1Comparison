<template>
    <div class="Site">
        <top></top>
        <middleContent class="Site-content"></middleContent>
        <bottom></bottom>
    </div>
</template>

<script>
import MiddleContent from './components/MiddleContent.vue'
import Top from './components/Top.vue'
import Bottom from './components/Bottom.vue'

export default {
    name: 'app',
        components: {
            Top,
            MiddleContent,
            Bottom
        }
    }
</script>
<style>
    #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }
    body,
    html {
        width: 100%;
        min-height: 100vh;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0px;
        display: flex;
        background-color: #ededed;
    }
    h1,
    h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
<style scoped></style>