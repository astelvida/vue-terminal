<template>
    <div class="items-container" v-if="output.items.length">
        <header class="title">
            <span><strong>{{ output.title }}</strong></span>
        </header>

        <ul class="items-list">
            <smart-list-item v-for="item in output.items" :key="item.id"
                :label="output.name" :item="item"
            ></smart-list-item>
        </ul>
    </div>
</template>

<script>

import ProdHuntItem from './ProdHuntItem';
import GithubItem from './GithubItem';
import MediumItem from './MediumItem';

const DefaultItem = {
    props: ['item'],
    render(h) {
        return h('li', this.item.name);
    }
};

const SmartListItem = {
    functional: true,
    render(h, context) {
        const { label } = context.props;
        let ListItem;
        
        if (label === 'github') ListItem = GithubItem;
        else if (label === 'medium') ListItem = MediumItem;
        else if (label === 'producthunt') ListItem = ProductHunt;
        else ListItem = DefaultItem;
        
        return h(ListItem, context.data, context.children);        
    } 
}

export default {
    props: ['output'],

    components: {
        'smart-list-item': SmartListItem,
    },
}
</script>

<style lang="scss">
.title {
    margin-bottom: 5px;
    color: aliceblue;
}

.items-list > * {
    margin-bottom: 5px;
}

.items-container {
    margin-right: 5px;
    line-height: 1.5;
}

</style>
