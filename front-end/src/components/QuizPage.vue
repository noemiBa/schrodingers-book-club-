<template>
    <PageWrapper title="Quiz">
      <b-container v-if="!answerSubmitted" class="d-flex justify-content-center">
        <b-row>
          <b-col :col="8" class="mx-auto">
            <b-card class="text-center" v-for="(question, index) in quizQuestions" :key="index">
              <h4 class="my-4">{{ question.title }}</h4>
              <b-form-group v-for="(option, optionIndex) in question.options" :key="optionIndex" class="mx-auto">
                <b-form-radio v-model="answers[index]" :value="optionIndex">{{ option }}</b-form-radio>
              </b-form-group>
            </b-card>
            <div class="d-flex justify-content-center">
              <b-button variant="dark" class="my-4" @click="submitAnswers">Submit</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div v-else>
        <h4 class="my-4 text-center">Recommended Books:</h4>
        <b-card-group deck>
            <b-row>
                <b-col v-for="(book, index) in recommendedBooks" :key="index" :cols="3" >
                <b-card class="text-center">
                    <b-card-title>{{ book.title }}</b-card-title>
                    <b-card-text>Author: {{ book.author }}</b-card-text>
                    <b-card-text>Description: {{ book.description }}</b-card-text>
                    <b-card-text>Genre: {{ book.genre }}</b-card-text>
                </b-card>
                </b-col>
            </b-row>
        </b-card-group>
    </div>
    </PageWrapper>
  </template>
  
<script>
import axios from 'axios';
import PageWrapper from './PageWrapper.vue';
import { BContainer, BRow, BCol, BCard, BFormGroup, BFormRadio, BButton, BCardGroup, BCardTitle, BCardText } from 'bootstrap-vue';
import store from '@/store/store.js'

export default {
    name: 'QuizPage',
    components: {
      PageWrapper,
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormGroup,
      BFormRadio,
      BButton,
      BCardGroup,
      BCardTitle,
      BCardText,
    },
    data() {
      return {
        answers: [],
        quizQuestions: [],
        recommendedBooks: [],
        answerSubmitted: false,
      };
    },
    computed: {
      isLoggedIn() {
        return store.state.loggedIn;
      },
      username() {
        return store.state.inputUsername
      },
      id() {
        return store.state.id
      },
    },
    watch: {
      recommendedBooks(newBooks) {
        if (this.isLoggedIn && newBooks.length > 0) {
          this.sendRecommendations();
        }
      }
    },
    methods: {
      async getQuizQuestions() {
        try {
          const response = await axios.get('http://localhost:3002/quizQuestions');
          this.quizQuestions = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async submitAnswers() {
        try {
          const response = await axios.post('http://localhost:3002/quizAnswers', { answers: this.answers });
          this.recommendedBooks = response.data;
          this.answerSubmitted = true;
        } catch (error) {
          console.error(error);
        }
      },
      async sendRecommendations() {
        const url = 'http://localhost:3000/recommendations';
        try {
            for (const book of this.recommendedBooks) {
                const data = {
                  userID: this.id,
                  ISBN: book.isbn
                };
                await axios.post(url, data);
              }
          } catch (error) {
            console.error(error);
        }
      },
    },
    async mounted() {
      await this.getQuizQuestions();
    },
  };
</script>

  
  <style scoped>
  .b-form-group {
    text-align: center;
  }
  .b-card {
    margin: 0 auto;
  }
  .b-button {
    display: block;
    margin: 0 auto;
  }
  </style>