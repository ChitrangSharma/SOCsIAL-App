import firebase from "firebase";
import "firebase/storage";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDXjDAzgy5xY0QhQ_Rd_NtWOZkejdaRyzU",
  authDomain: "instagram-clone-72ae5.firebaseapp.com",
  databaseURL: "https://instagram-clone-72ae5.firebaseio.com",
  projectId: "instagram-clone-72ae5",
  storageBucket: "instagram-clone-72ae5.appspot.com",
  messagingSenderId: "333864366433",
  appId: "1:333864366433:web:4c8e1c018844a785de1520",
  measurementId: "G-9PTSYS3WEY",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
// export default db;
