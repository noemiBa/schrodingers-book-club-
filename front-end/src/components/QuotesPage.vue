<template>
  <PageWrapper title="Blind date with a book">
    <b-overlay :show="!isReady" spinner-variant="primary" spinner-type="border">
      <b-card-group deck class="d-flex flex-row flex-wrap justify-content-center">
        <b-card v-for="(book, index) in displayedBooks" :key="index" class="quarter-width text-center">
          <template #header v-if="book.showCover">
            <b-img :src="book.cover" fluid alt="Book cover" style="max-height: 10rem;"></b-img>
          </template>
          <b-card-text v-if="!book.showCover">{{ book.excerpts[0] }}</b-card-text>
          <b-card-text v-if="book.showCover">{{ book.title }} by {{ book.author }}</b-card-text>
          <div class="d-flex justify-content-center mt-2">
            <b-button variant="outline-dark" @click="unveilMystery(book)">
              {{ book.showCover ? 'See Quote' : 'Unveil the mystery' }}
            </b-button>
          </div>
        </b-card>
      </b-card-group>
      <div class="mt-2 d-flex justify-content-center" v-if="displayedBooks.length < books.length">
        <b-button variant="dark" @click="showMoreBooks">Meet more books</b-button>
      </div>
    </b-overlay>
  </PageWrapper>
</template>

<script>
import axios from 'axios';
import PageWrapper from './PageWrapper.vue';
import { BCardGroup, BCard, BCardText, BButton, BImg, BOverlay } from 'bootstrap-vue';
import store from '@/store/store.js'

export default {
  name: 'QuotesPage',
  components: {
    BCardGroup,
    BCard,
    BCardText,
    BButton,
    BImg,
    BOverlay,
    PageWrapper,
  },
  data() {
    return {
      books: [],
      displayedBooks: [],
      chunkSize: 4,
    };
  },
  computed: {
    isLoggedIn() {
        return store.state.loggedIn;
    },
    username() {
        return store.state.inputUsername
    },
    isReady() {
      return this.books.length > 0;
    }
  },
  async beforeMount() {
    try {
      const response = await axios.get('http://localhost:3001/bookswithquotes');
      //const response = await axios.get('http://quotes-service:3001/bookswithquotes');
      this.books = response.data.map(book => ({ ...book, showCover: false }));
      this.showMoreBooks();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    showMoreBooks() {
      this.displayedBooks.push(...this.books.slice(this.displayedBooks.length, this.displayedBooks.length + this.chunkSize));
    },
    sendRecommendation(isbn) {
        try {
            const response = axios.post(`http://localhost:3000/${this.username}/recommendations`, { isbn });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
    async unveilMystery(book) {
        if (this.isLoggedIn) {
            await this.sendRecommendation(book.isbn);
        }
        book.showCover = !book.showCover;
    }
  },
};
</script>

<style scoped>
.quarter-width {
  width: 25%;
}

.b-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
