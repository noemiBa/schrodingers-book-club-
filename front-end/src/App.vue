<template>
<div id="app">
    <NavBar/>
    <HomePage/>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HomePage from './components/HomePage.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'App',
    components: {
        HomePage,
        NavBar
    }
}
</script>

<style>
#app {
    font-family: sans-serif, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
