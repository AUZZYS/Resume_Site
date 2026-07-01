import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0Xh0xWCcB_e4207JE76h833rMamuYUv4",
  authDomain: "photo-site-21d5c.firebaseapp.com",
  projectId: "photo-site-21d5c",
  storageBucket: "photo-site-21d5c.firebasestorage.app",
  messagingSenderId: "3508907456",
  appId: "1:3508907456:web:b630d0f65cacf73df4ec25",
  measurementId: "G-JEWTRMM67S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectStorage, projectFireStore, timestamp}

