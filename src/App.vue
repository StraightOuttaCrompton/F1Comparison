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
    /**
    * 1. Avoid the IE 10-11 `min-height` bug.
    * 2. Set `flex-shrink` to `0` to prevent some browsers from
    *    letting these items shrink to smaller than their content's default
    *    minimum size. See http://bit.ly/1Mn35US for details.
    * 3. Use `%` instead of `vh` since `vh` is buggy in older mobile Safari.
    */

    .Site {
        display: flex;
        flex-direction: column;
        height: 100%;
        /* 1, 3 */
    }

    .Site-header,
    .Site-footer {
        flex: none;
        /* 2 */
    }

    .Site-content {
        flex: 1 0 auto;
        /* 2 */
        padding: var(--space) var(--space) 0;
        width: 100%;
    }

    .Site-content::after {
        content: '\00a0';
        /* &nbsp; */
        display: block;
        margin-top: var(--space);
        height: 0px;
        visibility: hidden;
    }

    @media (--break-lg) {
        .Site-content {
            padding-top: var(--space-lg);
        }
        .Site-content::after {
            margin-top: var(--space-lg);
        }
    }

    .Site-content--full {
        padding: 0;
    }

    .Site-content--full::after {
        content: none;
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
        background-color: #ededed;
        text-rendering: optimizeLegibility;
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

    :root {
        --space: 1.5em;
        --space-lg: 2em;
        --bg-color: hsl(150, 45%, 50%);
    }

    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    /* @custom-media --break-sm (min-width: 384px);
    @custom-media --break-md (min-width: 576px);
    @custom-media --break-lg (min-width: 768px);
    @custom-media --high-dppx (-webkit-min-device-pixel-ratio: 1.5),
    (min-resolution: 144dpi),
    (min-resolution: 1.5dppx); 
    npm postcss
    */
    
</style>
<style scoped></style>