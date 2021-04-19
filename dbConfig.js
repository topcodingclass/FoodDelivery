import * as firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyAS2dbktykZ-YFaBVM-wqnJeieobdHjR8M",
    authDomain: "fooddelivery-8a59b.firebaseapp.com",
    projectId: "fooddelivery-8a59b",
    databaseURL: 'https://fooddelivery-8a59b.firebaseio.com',
    storageBucket: "fooddelivery-8a59b.appspot.com",
    messagingSenderId: "783020767119",
    appId: "1:783020767119:web:4465a03de2d2e99d7cfdfa"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();