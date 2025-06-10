// src/lib/firebase.js

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCB4Gmfrriv-oHa9uma8siDuNSCw67oUyo',
  authDomain: 'melodify-c2bbb.firebaseapp.com',
  projectId: 'melodify-c2bbb',
  storageBucket: 'melodify-c2bbb.appspot.com',
  messagingSenderId: '332155123267',
  appId: '1:332155123267:web:0e1e75ffdb7324678b06f6',
  measurementId: 'G-8M0R9BH79K',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Optional analytics (browser only)
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app)
  })
}
