<template>
<div id="app">
    <PageWrapper>
        <HomePage/>
    </PageWrapper>
</div>
</template>

<script>
import PageWrapper from './components/PageWrapper.vue'
import HomePage from './components/HomePage.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'App',
    components: {
        HomePage,
        PageWrapper
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
