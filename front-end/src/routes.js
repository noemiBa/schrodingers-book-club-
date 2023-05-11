import App from './App.vue';
import SignIn from './components/SignIn.vue';
import QuotesPage from './components/QuotesPage.vue';

export default [
  { path: '/', component: App },
  { path: '/signin', component: SignIn },
  { path: '/blind-date', component: QuotesPage }
];
