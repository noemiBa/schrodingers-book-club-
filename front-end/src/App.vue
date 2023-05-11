<template>
<div id="app">
    <!-- <SignIn /> -->
    <HomePage/>
</div>
</template>

<script>
//import SignIn from './components/SignIn.vue'
import HomePage from './components/HomePage.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'App',
    components: {
        // SignIn
        HomePage
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
