<template>
<div class="items-container" v-if="items">
    <header>
        <span>* <strong>{{ title }}</strong> *</span>;
    </header>
    <section class="items">
        <!-- <div slot="loading">Loading...</div> -->
        <div slot-scope="{ items }">
            
            <ul class="items-list">
                <li v-for="item in items" :key="item.id" class="item">
                    <label>{{ item.name }}</label>
                    <a :href="item.redirect_url" style="color:hotpink"></a>
                    <span>{{item.user.username}}</span>
                </li>
            </ul>
        </div>
    </section>
</div>
</template>

<script>

import commander from './commander';
import { fetchPosts } from './prodhunt.api';

export default {
    props: ['endpoint', 'title'],
    data () {
        return {
            loaded: false,
            list: null,
        };
    },
    created () {
        const list = storage.get('items').slice(0, 10);
        if (list.length) {
            this.items = list;
            this.loaded = true;
            return;
        }
       
        fetchPosts(this.endpoint)
            .then((list) => {
                this.items = list;
                this.loaded = true;
                storage.save('items', list);
            })
    },
    render() {
        console.log('LOADED?', this.loaded, this.items);
        if (this.loaded) {
            return this.$scopedSlots.default({
                list: this.items,
            });
        }
    },
}
</script>

<style lang="scss">

</style>
