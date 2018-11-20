<template>
    <div id="app">
        <header>
            <h2>Awesome Terminal</h2>
        </header>
        <section class="content">
            <h5>Random sub</h5>
            <p>When you use the class attribute on a custom component, those classes will be added to the component’s root element. Existing classes on this element will not be overwritten.
            </p>
        </section>
        <section class="content">
            <h3>Term suv</h3>
            <vue-terminal :styles="styles" :commands="commands" />
        </section>
        <footer>
            <ul class="links">
                <li><a href="#/all">All</a></li>
                <li><a href="#/all">foo</a></li>
                <li><a href="#/all">Git</a></li>
            </ul>
        </footer>
    </div>
</template>

<script>

export default {
    data() {
        return {
            commands: {
                greet: () => 'Hello!',
                random: (num) => 'Random' + Math.random() * num,
                ctx: (args, context) => console.log(context.history)
            },
            styles: {
                // fontSize: `15px`,
                // fontFamily: 'monospace',
                // fontWeight: 'normal',
                // color: 'yellow',
                // backgroundColor: 'blue',
                // height: 'auto',
                width: 'auto',
            }
        }
    }
}

</script>

<style lang="scss">
.content {
    background: orangered;
}


.links {
    display: flex;
}

</style>
