<template>
<div id="app-wrapper">
    <div id="app" class="theme">
        <div id="term" class="flex-col"
            tabindex="0"
            @keydown="handleKeyPress"
        >
            <div id="toolbar" class="flex-row-center">
                <div id="osx-icons" class="flex-row-center">
                    <img class="osx-icon" src="./assets/osx_red_icon.png">
                    <img class="osx-icon" src="./assets/osx_orange_icon.png">
                    <img class="osx-icon" src="./assets/osx_green_icon.png">
                </div>
                <div class="browser" >{{ browser }}</div>
            </div>

            <div id="screen" ref="screen">
                <ul v-show="history.length" id="history" class="flex-col">
                    <li v-for="entry in history" :key="entry.id" class="entry flex-row-center">
                        <span v-show="entry.user ==='user'" style="color:#ff47e3" class="prompt-text">❯</span>
                        <span v-show="entry.user ==='user'" style="color:#64ffda" class="prompt-text">{{ prefix }}</span>
                        <span v-show="entry.user ==='user'" style="color:#00e5ff" class="prompt-text">{{ icon }}</span>
                        <span v-html="entry.text"></span>
                    </li>
                </ul>

                <div id="prompt-wrapper" ref="prompt" class="flex-row-center">
                    <div class="prompt-prefix">
                        <span style="color:#ff47e3" class="prompt-text">❯</span>
                        <span style="color:#64ffda" class="prompt-text">{{ prefix }}</span>
                        <span style="color:#00e5ff" class="prompt-text">{{ icon }}</span>
                    </div>
                    <input @input="updateInput" :value="userInput" ref="input"
                        type="text"
                        id="user-input" 
                        autofocus autocomplete="off" autocapitalize="off"
                        autocorrect="off" spellcheck="false"
                        @keyup.enter="handleInput"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- <pre style="color: black">{{ history }}</pre> -->
    <!-- <div v-html="history"></div> -->

</div>
</template>

<script>

import commander from './commander';
import { getBrowser } from './windowUtil';

export default {
    props: {
        theme: {
            type: String,
            default: 'material'
        },
         prefix: {
            type: String,
            default: 'term-vue'
        },
        icon: {
            type: String,
            default: '$'
        }         
    },
    data () {
        return {
            history: [],
            userInput: '',
            bottomOffset: 0,
            commands: '',
            cmd: null,
            browser: getBrowser(),
        } 
    },

    created() {
        this.commands = commander(this);
        this.commands.medium();
        
    },
    updated() {
        const { scrollHeight, clientHeight, scrollTop } = this.$refs.screen;
        this.bottomOffset = (scrollHeight - clientHeight) - scrollTop;
        this.$refs.screen.scrollTop += this.bottomOffset;
    },

    watch: {
    },

    methods: {
        handleKeyPress(e) {
            console.log('E', e)
           if (e.code === 'KeyK' && e.keyCode === 75) {
               this.commands.clear();
           } else if (e.key !== 'Meta') {
               this.focusOnInput();
           }
        },
        updateInput(e) {
            this.userInput = e.target.value;
        },
        async handleInput() {
            if (!this.userInput.trim()) {
                this.addToHistory({ user: 'user', text: this.userInput });
                return;
            }
            
            const [cmd, ...args] = this.userInput.trim().split(' ');
            this.cmd = this.commands[cmd] ? cmd : 'oops';
            this.output = await this.commands[this.cmd](args)
            
            if (!this.output) {
                this.userInput = '';
                this.cmd = '';
                return;
            }

            this.addToHistory({ user: 'user', text: this.userInput });;
            this.addToHistory({ user: 'term', text: this.output });
            this.userInput = '';
            this.cmd = '';          
        },

        addToHistory({ user, text }) {
            this.history.push({
                id: this.history.length,
                timestamp: new Date(),
                text,
                user,
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
        inputLength() {
            return this.userInput ? (this.userInput.length + 0 ) + '' : '0';
        }

    },
}
</script>

<style lang="scss">
@import './assets/normalize';
@import './assets/app-style.scss';

</style>
