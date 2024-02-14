import firebase from "firebase/app"
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAEO3C64o8jcFgPf7W6In9saAoLTD3broA",
  authDomain: "eshop-4976e.firebaseapp.com",
  projectId: "eshop-4976e",
  storageBucket: "eshop-4976e.appspot.com",
  messagingSenderId: "855876450849",
  appId: "1:855876450849:web:f0b97a871171dbba230160"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;