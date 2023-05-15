<template>
    <PageWrapper title="Sign In/Sign Up"> 
      <div class="container">
        <b-form v-if="!loggedIn" @submit.prevent="signIn">
          <b-form-group id="username-group" label="Username:" label-for="username-input">
            <b-form-input id="username-input" v-model="username" required placeholder="Enter your username"></b-form-input>
          </b-form-group>
          <b-form-group id="password-group" label="Password:" label-for="password-input">
            <b-form-input id="password-input" v-model="password" required type="password" placeholder="Enter your password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="signInDisabled">Sign In</b-button>
          <b-button @click="signUp" variant="secondary">Sign Up</b-button>
        </b-form>
        <div v-else>
           <h3>You are logged in as {{ displayUsername }}!</h3>
          <b-button @click="logOut" variant="primary">Log Out</b-button>
        </div>
      </div>
    </PageWrapper>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue'
  import axios from 'axios'
  import PageWrapper from './PageWrapper.vue'
  import store from '@/store/store.js'
  
  export default {
    name: 'SignIn',
    components: {
      BForm,
      BFormGroup,
      BFormInput,
      BButton,
      PageWrapper
    },
    computed: {
      loggedIn() {
        return store.state.loggedIn
      },
      inputUsername() {
        return store.state.inputUsername
      },
      displayUsername() {
        return this.loggedIn ? this.inputUsername : this.username
      }
    },
    setup() {
      const title = ref('Sign In')
      const username = ref('')
      const password = ref('')
  
      const validateInput = () => {
        return username.value.trim() !== '' || password.value.trim() !== ''
      }
  
      const signIn = () => {
        if (validateInput()) {
          axios.post('http://localhost:3000/users', {
            name: username.value,
            password: password.value
          })
            .then(() => {
                store.commit('SET_LOGGED_IN', true)
                store.commit('SET_USERNAME', username.value)
            })
            .catch(error => {
              console.error(error)
              alert('Error signing in')
            })
        }
      }
  
      const signUp = () => {
        if (validateInput()) {
          axios.post('http://localhost:3000/users', {
            name: username.value,
            password: password.value
          })
            .then(() => {
               store.commit('SET_LOGGED_IN', true)
               store.commit('SET_USERNAME', username.value)
            })
            .catch(error => {
              store.commit('SET_LOGGED_IN', true)
              store.commit('SET_USERNAME', username.value)
              console.error(error)
              alert('Error creating user')
            })
        }
      }
  
      const logOut = () => {
        store.commit('SET_LOGGED_IN', false)
        store.commit('SET_USERNAME', '')
        username.value = ''
        password.value = ''
      }
  
      const signInDisabled = () => {
        return !validateInput()
      }
  
      return {
        title,
        username,
        password,
        signIn,
        signUp,
        logOut,
        signInDisabled
      }
    }
  }
  </script>
  
  
  
<style>  
.container {
    max-width: 500px;
    margin: 0 auto;
    padding-top: 50px;
}
</style>