<template>
<div id="wrapper" ref="wrapper">
    <div id="window" class="flex-col" tabindex="0" @keyup="handleKeyPress" 
        :style="styleObj"
    >
        <toolbar @close="$refs.wrapper.style.display='none'" @maximise="show=true" @minimise="show=false"/>
        <section v-if="show" id="screen" ref="screen">
            <ul v-if="history.length" class="flex-col">
                <li v-for="entry in history" :key="entry.id" class="flex-col history-entry">
                    <input-line>
                        <span v-if="entry.input">{{ entry.input }}</span>
                    </input-line>
                    <span v-if="entry.output && typeof entry.output === 'string'">{{ entry.output }}</span>
                    <output-items v-else-if="typeof entry.output === 'object'" :output="entry.output"/>
                </li>
            </ul>

            <input-line>
                <input @input="updateInput" :value="input" ref="input"
                    type="text"
                    autofocus autocomplete="off" autocapitalize="off"
                    autocorrect="off" spellcheck="false"
                    @keyup.enter.prevent="handleInputEnter"
                />
            </input-line>                    
        </section>
    </div>
</div>
</template>

<script>
import Toolbar from './Toolbar';
import InputLine from './InputLine';
import OutputItems from './output/OutputItems';
import commander from './commander';

export default {
    components: {
        toolbar: Toolbar,
        'input-line' : InputLine,
        'output-items' : OutputItems,
    },

    props: {
        commands: {
            type: Object,
        },
        styles: {
            type: Object,
        }
    },

    data () {
        return {
            history: [],
            input: '',
            commandMap: {},
            bottomOffset: 0,
            inputIndex: -1,
            show: true,
        } 
    },

    created() {
        this.commandMap = commander(this.commands, this);   
    },

    updated() {
        if (!this.$refs.screen) return;
        const { scrollHeight, clientHeight, scrollTop } = this.$refs.screen;
        this.bottomOffset = (scrollHeight - clientHeight) - scrollTop;
        this.$refs.screen.scrollTop += this.bottomOffset;
    },

    mounted() {
        window.vm = this;
    },

    methods: {
        handleKeyPress(e) { 
            if (e.key === 'Escape') {
                this.commandMap.run('clear')
            } else if (e.code === 'ArrowUp') {
                if (this.inputIndex) {
                    this.inputIndex--;
                    this.input = this.inputs[this.inputIndex];
                }
            
            } else if (e.code === 'ArrowDown') {
                if (this.inputIndex === this.inputs.length) {
                    this.input = '';
                } else {
                    this.input = this.inputs[this.inputIndex];
                    this.inputIndex++;
                }

            } else if (!e.metaKey) {
                this.focusOnInput();
            }
        },

        focusOnInput(e) {
            this.$refs.input.focus();
        },

        updateInput(e) {
            this.input = e.target.value;
        },
        
        handleInputEnter(e) {
            let [command, args] = this.input.trim().split(' ');
            
            if (!command) {
                this.addToHistory({ input: this.input });
                return;
            }
            this.pending = true;
            this.commandMap.run(command, args)
                .then(output => {
                    this.addToHistory({ input: this.input, output });
                    this.pending = false;
                });
        },
        addToHistory({ input = '', output = ''}) {
            this.history.push({
                id: Math.random(),
                input,
                output,
            });

            this.input = '';        
            this.inputIndex = this.inputs.length;
        },
    },
    computed: {
        inputs() {
            return this.history
                .map(entry => entry.input)
                .filter(text => text ? text.length : '');
        },

        styleObj() {
            const style = {};
            (!this.show) && (style.height = 'fit-content');

            return {
                ...style,
                ...this.styles
            }
        }
    }
}

</script>

<style lang="scss">
@import './assets/normalize';
@import './assets/app-style.scss';

</style>
