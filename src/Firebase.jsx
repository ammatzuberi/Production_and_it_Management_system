import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import "firebase/compat/auth";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDn47udTWoCiVmxs-q77sDpXyLBHpHcpCI",
  authDomain: "eneproit.firebaseapp.com",
  projectId: "eneproit",
  storageBucket: "eneproit.appspot.com",
  messagingSenderId: "165741751208",
  appId: "1:165741751208:web:0594bb4dcd966943274b9d",
  measurementId: "G-N5QH01Z3P9"
});
var db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export default firebaseApp;

export { db };
