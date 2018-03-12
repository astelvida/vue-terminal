<template>
<div>
<div id="app">
    <div 
        class="term flex-col"
        tabindex="0"
        @focus.prevent="focusOnInput"
    >
        <div class="toolbar flex-row-center">
            <div class="osx-icons flex-row-center">
                <img class="osx-icon" src="./assets/osx_red_icon.png">
                <img class="osx-icon" src="./assets/osx_orange_icon.png">
                <img class="osx-icon" src="./assets/osx_green_icon.png">
            </div>
        </div>

        <div class="screen flex-col">
            <ul v-if="history.length" class="flex-col">
                <li v-for="entry in history" :key="entry.id" class="entry flex-row-center" >
                    <span v-show="entry.type ==='input'" class="prompt-icon">$</span>
                    <span>{{entry.text}}</span>
                </li>
            </ul>

            <div id="prompt" class="flex-row-center">
                <span class="prompt-icon">$</span> 
                <input
                    ref="input" 
                    v-model="userInput" type="text"
                    autofocus autocomplete="off"
                    @keyup.enter="onReturnPressed"
                />
            </div>
        </div>
    </div>
</div>
    <pre style="color: black">{{ history }}</pre>
</div>
</template>

<script>


const ws = new WebSocket('ws://localhost:5000');

const storage = {
    fetch() {
        const cache = window.localStorage.getItem('history');
        if (!cache) return [];
        return JSON.parse(cache);
    },
    save(data) {
        window.localStorage.setItem('history', JSON.stringify(data));
    },
    clear() {
         window.localStorage.setItem('history', null);
    },
}

export default {
    data () {
        return {
            history: storage.fetch(),
            userInput: '',
            output: '',
            open: false,
        } 
    },

    created() {
        ws.onopen = () => {
            this.open = true;
        };

        ws.onmessage = (message) => {
            this.output = message.data;
            this.addToHistory('output');
        };

    },

    methods: {
        onReturnPressed() {            
            this.addToHistory('input');
            
            ws.send(this.userInput);
            
            this.userInput = '';
            this.output = '';
        },

        addToHistory(type) {
            this.history.push({
                id: this.history.length,
                text: type === 'input' ? this.userInput : this.output,
                timestamp: new Date(),
                type,
            });
        },

        focusOnInput(e) {
            this.$refs.input.focus();
        },

        lastEntry() {
            return this.history[this.history.length - 1]
        }
    },


    computed: {
        
    },
}
</script>

<style lang="scss">
@import './assets/normalize';
@import './assets/app-style.scss';

</style>
