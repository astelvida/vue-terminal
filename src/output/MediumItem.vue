<template>
    <li>
        <a :href="`https://medium.com/${item.collection}/${item.uniqueSlug}`">
            <label style="color:hotpink">{{item.title}}</label>
        </a> -
        <span>👏{{item.virtuals.totalClapCount}}</span><br>
        <span class="dimmed">
            <span>{{item.username}} </span> |
            {{Math.ceil(item.virtuals.readingTime)}} min read |
            {{new Date(item.createdAt).toDateString().split(' ').slice(1).join(' ')}}
        </span>
    </li>
</template>

<script>

export default {
    name: 'medium-item',
    props: ['item'],
}
</script>

<style lang="scss">

</style>



 
