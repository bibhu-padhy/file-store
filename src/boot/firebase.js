import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBawhDTjLS7Cx7m-H32loPHRkx3IyRO9NY",
  authDomain: "files--store.firebaseapp.com",
  projectId: "files--store",
  storageBucket: "files--store.appspot.com",
  messagingSenderId: "399493920742",
  appId: "1:399493920742:web:77337eebeb1b9d9cba0827",
  measurementId: "G-PLSS0CLBHE"

});


export const auth = app.auth();
export const firestore = app.firestore();
export const realTimeDb = app.database();
export const storage = app.storage();
export const timestamp = firebase.firestore.Timestamp;
export const FieldValue = firebase.firestore.FieldValue;
