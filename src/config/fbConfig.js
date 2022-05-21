// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUF2JlCnV6AxhAxo5wTJbKQfP741-qPdQ',
  authDomain: 'cpiproject-7761a.firebaseapp.com',
  projectId: 'cpiproject-7761a',
  storageBucket: 'cpiproject-7761a.appspot.com',
  messagingSenderId: '820229834176',
  appId: '1:820229834176:web:ffb75cf1e5948af29a3425',
  measurementId: 'G-S7P09QE5N6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage, app }
