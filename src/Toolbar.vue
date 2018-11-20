<template>
<div id="toolbar" class="flex-center">
    <div id="osx-icons" class="flex-row-center">
        <img class="osx-icon" src="./assets/osx_red_icon.png" @click="$emit('close')">
        <img class="osx-icon" src="./assets/osx_orange_icon.png" @click="$emit('minimise')">
        <img class="osx-icon" src="./assets/osx_green_icon.png" @click="$emit('maximise')">
    </div>
    <div class="browser-info">{{ browser }}</div>
</div>
</template>

<script>

import { getBrowser } from './utils/browser';

export default {
    data() {
        return {
            browser: getBrowser(),
        }
    }
}
</script>

<style lang="scss">
#toolbar {
    flex: none;
    position: relative;
    height: 25px;
}

#osx-icons {
    flex: none;
    position: absolute;
    left: 3px;
    top: 3px;
}

.osx-icon {
    width: 18px;
    height: 18px;
}

.browser-info {
    position: relative;
}

</style>
