<template>
    <div id="driver">
        <div class="container">
            <div class="driverId">driverId</div>
            <div class="wikiURL">wikiURL</div>
            <div class="firstName">firstName</div>
            <div class="familyName">familyName</div>
            <div class="dateOfBirth">dateOfBirth</div>
            <div class="nationality">nationality</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'driver'
    }
</script>

<style scoped>
    #driver {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    #driver:nth-child(n) {
        flex: 1;
    }
    .container {
        margin: 15%;
        min-width: 200px;
    }
</style>