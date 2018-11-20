<template>
    <li>
        <a :href="item.redirect_url" style="color:hotpink">
            <label>{{ item.name }}</label>
        </a>
        <span>  ⭐{{item.votes_count}}</span><br>
        <span>{{item.tagline}} </span>
    </li>
</template>

<script>

export default {
    name: 'prodhunt-item',
    props: ['item'],
}
</script>

<style lang="scss">

</style>



