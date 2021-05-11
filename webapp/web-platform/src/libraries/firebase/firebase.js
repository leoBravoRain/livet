import firebase from "firebase";

// API credentials
var firebaseConfig = {
    apiKey: "AIzaSyB1LzH4djy5r5MnM7dE3bAAKEyb6bajqP8",
    authDomain: "livet2.firebaseapp.com",
    projectId: "livet2",
    storageBucket: "livet2.appspot.com",
    messagingSenderId: "940966278422",
    appId: "1:940966278422:web:2fbadabc1d102408dd8c37",
    measurementId: "G-PJ4QBLNSQG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const fs = app.firestore();
export const auth = app.auth();

// export const an = firebase.analytics();

// export const st = app.storage();