<template>
    <div>
      <NavBar />
      <div class="jumbotron-wrapper">
        <div class="jumbotron-overlay"></div>
        <b-jumbotron v-if="title" fluid class="bg-dark text-light"
          :style="{ backgroundImage: 'url(' + require('@/assets/img/homepage-img.jpg') + ')' }"
        >
          <template v-slot:header>
            <h1 class="display-4">{{ title }}</h1>
          </template>
          <template v-if="subtitle" v-slot:lead>
            <p class="lead">{{ subtitle }}</p>
          </template>
        </b-jumbotron>
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  import { BJumbotron } from 'bootstrap-vue';
  
  export default {
    name: 'PageWrapper',
    components: {
      NavBar,
      BJumbotron,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      subtitle: {
        type: String,
        default: '',
      },
    },
  };
  </script>
  
  <style scoped>
  .display-4 {
    text-transform: uppercase;
    text-align: center;
    position: relative;
    z-index: 1;
    padding-bottom: 7%;
  }
  .lead {
    text-align: center;
    position: relative;
    z-index: 1;
  } 
  .jumbotron-wrapper {
    position: relative;
  }
  
  .jumbotron-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }
  
  .bg-dark {
    background-color: transparent !important;
  }
  </style>
  