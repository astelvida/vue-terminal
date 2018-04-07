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
                <section id="history">
                    <ul v-if="history.length" class="flex-col">   
                        <li v-for="entry in history" :key="entry.id" class="flex-row-center">
                            <div class="prompt-prefix flex-row-center" 
                                v-show="entry.user ==='user'">
                                <span style="color:#ff47e3">❯</span>
                                <span style="color:#64ffda">{{ prefix }}</span>
                                <span style="color:#00e5ff">{{ icon }}</span>
                            </div>
                            <!-- <span>{{ entry.text }}</span> -->
                            <prod-hunt
                                title="Most upvoted products last month"
                                endpoint="all"
                            />
                        </li>
                    </ul>
                </section>


                <section id="user-input" class="flex-row-center">
                    <div class="prompt-prefix flex-row-center">
                        <span style="color:#ff47e3">❯</span>
                        <span style="color:#64ffda">{{ prefix }}</span>
                        <span style="color:#00e5ff">{{ icon }}</span>
                    </div>
                    <input @input="updateInput" :value="userInput" ref="input"
                        type="text"
                        autofocus autocomplete="off" autocapitalize="off"
                        autocorrect="off" spellcheck="false"
                        @keyup.enter="handleInput"
                    />
                </section>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import commander from './commander';
import getBrowser from './getBrowser';
import ProdHunt from './ProdHunt';

export default {
    components: {
        'prod-hunt' : ProdHunt,
    },
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
            history: storage.get('history'),
            userInput: '',
            bottomOffset: 0,
            commands: '',
            cmd: null,
            browser: getBrowser(),
        } 
    },

    created() {
        this.commands = commander(this);        
    },
    updated() {
        const { scrollHeight, clientHeight, scrollTop } = this.$refs.screen;
        this.bottomOffset = (scrollHeight - clientHeight) - scrollTop;
        this.$refs.screen.scrollTop += this.bottomOffset;
    },

    methods: {
        handleKeyPress(e) {
           if (e.code === 'KeyK' && e.keyCode === 75) {
               this.commands.clear();
           } else if (e.key !== 'Meta') {
               this.focusOnInput();
           }
        },

        focusOnInput(e) {
            this.$refs.input.focus();
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
            this.cmd = this.commands[cmd] ? cmd : 'default';
            
            this.output = await this.commands[this.cmd](args);
            
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

            storage.save('history', this.history)
        },

    },
    computed: {},
}
</script>

<style lang="scss">
@import './assets/normalize';
@import './assets/app-style.scss';

</style>
