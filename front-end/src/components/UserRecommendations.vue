<template>
    <PageWrapper :title="isLoggedIn ? `${username}'s Recommendations` : `User's Recommendations`">
      <b-container v-if="isLoggedIn && hasReccomendations">
        <b-card-group deck>
          <b-card v-for="(book, index) in userRecommendations" :key="index" class="mb-3">
            <b-card-title>{{ book.title }}</b-card-title>
            <b-card-text>Author: {{ book.author }}</b-card-text>
          </b-card>
        </b-card-group>
      </b-container>
      <b-container v-if="isLoggedIn && !hasReccomendations">
        <h4>You don't have any recommendations yet.</h4>
      </b-container>
      <b-container v-if="!isLoggedIn">
        <h4>You need to log in to see this page.</h4>
      </b-container>
    </PageWrapper>
  </template>
  
  <script>
  import axios from 'axios';
  import PageWrapper from './PageWrapper.vue';
  import store from '@/store/store.js';
  import { BContainer, BCard, BCardGroup, BCardTitle, BCardText } from 'bootstrap-vue';
  
  export default {
    name: 'UserRecommendations',
    components: {
      PageWrapper,
      BContainer,
      BCard,
      BCardGroup,
      BCardTitle,
      BCardText
    },
    data() {
      return {
        userRecommendations: [],
      };
    },
    computed: {
      isLoggedIn() {
        return store.state.loggedIn;
      },
      username() {
        return store.state.inputUsername;
      },
      id() {
        return store.state.id;
      },
      hasReccomendations() {
        return this.userRecommendations.length > 0; 
      }
    },
    async created() {
      if (this.isLoggedIn) {
          await this.fetchRecommendations();
      }
    },
    methods: {
      async fetchRecommendations() {
        try {
          const response = await axios.get(`http://backend-service:3000/recommendations/${this.id}`);
          this.userRecommendations = response.data.data.userRecommendations;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  