import firebase from "firebase/app";
import "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyByQ-6nQQ3LCfmdqbNpKqEHNQ0SBbMQHHc",
  authDomain: "motoapp-80898.firebaseapp.com",
  projectId: "motoapp-80898",
  storageBucket: "motoapp-80898.appspot.com",
  messagingSenderId: "142119301334",
  appId: "1:142119301334:web:b7efb6b14f52dd5bdad977",
  measurementId: "G-KWSH68F16Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const firebaseDB = firebase.firestore();