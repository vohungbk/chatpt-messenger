import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCX4cBpS-4vVu0PBNQsOIYv5emuNGTsXG4',
  authDomain: 'chat-gpt-messenger-1ebe6.firebaseapp.com',
  projectId: 'chat-gpt-messenger-1ebe6',
  storageBucket: 'chat-gpt-messenger-1ebe6.appspot.com',
  messagingSenderId: '829736756249',
  appId: '1:829736756249:web:332513ddb709d9ac9d7688',
  measurementId: 'G-00ZKLE2WXK',
}

// const app = initializeApp(firebaseConfig);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
