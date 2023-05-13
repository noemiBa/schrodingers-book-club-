<template>
    <PageWrapper title="Quiz">
      <b-container class="d-flex justify-content-center">
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
    </PageWrapper>
  </template>

  <script>
  import axios from 'axios';
  import PageWrapper from './PageWrapper.vue';
  import { BContainer, BRow, BCol, BCard, BFormGroup, BFormRadio, BButton } from 'bootstrap-vue';
  
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
    },
    data() {
      return {
        answers: [],
        //quizQuestions: [],
        recommendedBooks: [],
        quizQuestions: [
          {
            title: 'Which of the four do you prefer?',
            options: [
              'Obvious hero and villain.',
              'Smart hero and villain.',
              'Ensemble heroes and villains.',
              'No heroes, only villains.',
            ],
          },
          {
            title: 'What type of endings do you prefer?',
            options: [
              'Happy endings.',
              'Sappy endings.',
              'Cliffhangers.',
              'No ending, just cut to the credits.',
            ],
          },
          {
            title: "For wherever you happen to live in the world, which best describes your area?",
            options: [
              "I'm from the north.",
              "I'm from the east.",
              "I'm from the west.",
              "I'm from the south.",
            ],
          },
          {
            title: "What's your favourite category?",
            options: [
              'Drama',
              'Not Drama',
              'Dramedy',
              'Fantasy',
            ],
          },
        ],
      };
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
          console.log(this.recommendedBooks);
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