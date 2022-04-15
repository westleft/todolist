import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import withUUID from "vue-uuid";
import App from './App.vue'
import store from './store/index.js'
import firebaseConfig from '../firebaseConfig'

const firebase = initializeApp(firebaseConfig);

const app = withUUID(
    createApp(App)
)

app.use(store).mount('#app')