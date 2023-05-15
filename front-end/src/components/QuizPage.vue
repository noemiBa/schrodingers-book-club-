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
        // quizQuestions: [
        //   {
        //     title: 'Which of the four do you prefer?',
        //     options: [
        //       'Obvious hero and villain.',
        //       'Smart hero and villain.',
        //       'Ensemble heroes and villains.',
        //       'No heroes, only villains.',
        //     ],
        //   },
        //   {
        //     title: 'What type of endings do you prefer?',
        //     options: [
        //       'Happy endings.',
        //       'Sappy endings.',
        //       'Cliffhangers.',
        //       'No ending, just cut to the credits.',
        //     ],
        //   },
        //   {
        //     title: "For wherever you happen to live in the world, which best describes your area?",
        //     options: [
        //       "I'm from the north.",
        //       "I'm from the east.",
        //       "I'm from the west.",
        //       "I'm from the south.",
        //     ],
        //   },
        //   {
        //     title: "What's your favourite category?",
        //     options: [
        //       'Drama',
        //       'Not Drama',
        //       'Dramedy',
        //       'Fantasy',
        //     ],
        //   },
        // ],
        // recommendedBooks: [
        //    {
        //         author: "Dan Brown",
        //         isbn: "9780307474278",
        //         genre: "Mystery",
        //         description: "While in Paris on business.",
        //         title: "The Da Vinci Code"
        //     },
        //     {
        //         author: "Shel Silverstein",
        //         isbn: "9780060256654",
        //         genre: "Childrens Literature",
        //         description: "A heart-warming story,",
        //         title: "The Giving Tree"
        //     },
        //     {
        //         author: "Dan Brown",
        //         isbn: "9780307474278",
        //         genre: "Mystery",
        //         description: "While in Paris on business.",
        //         title: "The Da Vinci Code"
        //     },
        //     {
        //         author: "Dan Brown",
        //         isbn: "9780307474278",
        //         genre: "Mystery",
        //         description: "While in Paris on business.",
        //         title: "The Da Vinci Code"
        //     },
        //     {
        //         author: "Shel Silverstein",
        //         isbn: "9780060256654",
        //         genre: "Childrens Literature",
        //         description: "A heart-warming story,",
        //         title: "The Giving Tree"
        //     }
        // ]
      };
    },
    computed: {
      isLoggedIn() {
        return store.state.loggedIn;
      },
      username() {
        return store.state.inputUsername
      }
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
        const url = `http://localhost:3000/${this.username}/recommendations`;
        const isbns = this.recommendedBooks.map(book => book.isbn);
        try {
            await axios.post(url, { isbns });
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