<template>
    <li>
        <a href="item.html_url"><label style="color:mediumspringgreen;">{{item.name}}</label></a>
        <span style="color: gold">[✨{{item.stargazers_count}}]</span><br>
        <span>{{item.description}}</span>
    </li>
</template>

<script>

export default {
    name: 'github-item',
    props: ['item'],
}
</script>

<style lang="scss">

</style>
