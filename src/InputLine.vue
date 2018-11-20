<template>
    <div class="prompt flex-row-center">
        <!-- <div class="prompt"> -->
            <span style="color:#ff47e3">❯</span><span style="color:#64ffda">term-vue</span><span style="color:#00e5ff">$</span>
        <!-- </div> -->
        <slot></slot>
    </div>

    
</template>

<script>

export default {}

</script>

<style lang="scss">

.prompt {
    flex: none;
}
.prompt > * {
    margin-right: 5px;
}
</style>
