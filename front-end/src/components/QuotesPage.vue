<template>
    <PageWrapper title="Blind date with a book"> 
    <div>
      <b-card-group deck class="d-flex flex-row flex-wrap justify-content-center">
        <b-card v-for="(book, index) in displayedBooks" :key="index" class="quarter-width text-center">
          <template #header>
            <b-img :src="book.cover" fluid alt="Book cover" style="max-height: 10rem;"></b-img>
          </template>
          <b-card-text>{{ book.excerpts[0] }}</b-card-text>
        </b-card>
      </b-card-group>
      <div class="mt-2 d-flex justify-content-center" v-if="displayedBooks.length < books.length">
        <b-button variant="primary" @click="showMoreQuotes">
          Meet more Quotes
        </b-button>
      </div>
    </div>
   </PageWrapper>
  </template>
  
  <script>
  import axios from 'axios';
  import PageWrapper from './PageWrapper.vue'
  import { BCardGroup, BCard, BCardText, BButton, BImg } from 'bootstrap-vue';
  
  export default {
    name: 'QuotesPage',
    components: {
      BCardGroup,
      BCard,
      BCardText,
      BButton,
      BImg,
      PageWrapper
    },
    data() {
      return {
        books: [],
        displayedBooks: [],
        chunkSize: 4,
      };
    },
    created() {
      axios.get('http://localhost:3001/bookswithquotes')
        .then((response) => {
          this.books = response.data;
          this.displayedBooks = this.books.slice(0, this.chunkSize);
        })
        .catch((error) => console.log(error));
    },
    methods: {
      showMoreQuotes() {
        const startIndex = this.displayedBooks.length;
        const endIndex = Math.min(startIndex + this.chunkSize, this.books.length);
        this.displayedBooks = [...this.displayedBooks, ...this.books.slice(startIndex, endIndex)];
      },
    },
  };
  </script>
  
  <style scoped>
  .quarter-width {
    width: 25%;
  } 
  .button-container {
    text-align: center;
  }
  </style>
  