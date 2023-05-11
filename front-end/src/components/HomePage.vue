<template>
    <div>
      <b-jumbotron class="jumbotron" fluid>
            <div class="overlay"></div>
            <div class="container">
              <h1 class="display-4 text-white">Schrodinger Book Club</h1>
              <p class="lead text-white">Join our book club and explore the world of literature!</p>
            </div>
      </b-jumbotron>
      <b-container fluid>
        <b-row class="justify-content-center">
          <b-col md="6" lg="4" class="my-3">
            <b-card title="Take a Quiz" class="text-center">
              <b-card-text>
                Take our fun and interactive book quiz to discover your next read!
              </b-card-text>
              <b-button variant="primary" to="/quiz">Start Quiz</b-button>
            </b-card>
          </b-col>
          <b-col md="6" lg="4" class="my-3">
            <b-card title="Blind Date with a Quote" class="text-center">
              <b-card-text>
                Let us match you with a book based on your favorite quote!
              </b-card-text>
              <b-button variant="primary" to="/blind-date">Find a Book</b-button>
            </b-card>
          </b-col>
          <b-col md="6" lg="4" class="my-3">
            <b-card title="Sign In to see your Recommendations" class="text-center">
              <b-card-text>
                Sign in to see your personalized book recommendations.
              </b-card-text>
              <b-button variant="primary" to="/signin">Sign In</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { BJumbotron, BContainer, BCard, BRow, BCol, BCardText,BButton } from 'bootstrap-vue'
  
  export default {
    name: 'HomePage',
    components: {
      BJumbotron,
      BContainer,
      BCard,
      BRow,
      BCol,
      BCardText,
      BButton
    }
  }
  </script>
  
  <style scoped>
  @media (min-width: 576px) {
    .b-card {
      min-height: 350px;
    }
  }
  .jumbotron {
    background-image: url('../assets/img/homepage-img.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .jumbotron::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6); 
  }
  .jumbotron h1 {
    font-size: 5em;
    color: white;
    text-align: center;
    margin-top: 0; 
  } 
  .jumbotron p {
    font-size: 1.5em;
    color: white;
    text-align: center;
  }
  .jumbotron .container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  } 
  </style>
  