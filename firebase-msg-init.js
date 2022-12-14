import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAN-X9u7n7QnM8RLrVV4YnXq2MmVz6WNfw",
    authDomain: "em-issyoo.firebaseapp.com",
    projectId: "em-issyoo",
    storageBucket: "em-issyoo.appspot.com",
    messagingSenderId: "33480809995",
    appId: "1:33480809995:web:74df1e056f7638d0b5310e",
    measurementId: "G-C64NWHRT0Y"
  };
  import{
      getFirestore,Timestamp , doc, getDoc, getDocs, limit, orderBy, query, where, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot, arrayUnion
  }from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
  import { getAuth, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider , signOut
  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getMessaging, getToken ,onMessage} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging.js";
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore();
const messaging = getMessaging(app);
// Add the public key generated from the console here.

  // Saves the messaging device token to Cloud Firestore.
requestNotificationsPermissions();
async function saveMessagingDeviceToken() {
    // Add the public key generated from the console here.
getToken(messaging, { vapidKey: 'BEJuIVEwajH7KGC1M0w82E911C8KFzzvucHGr_BQ0Iwg2gaMslI48xqnneTv5FADkeRBq6427m933tLLSM_5ZL4' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken);
    SaveToken(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
}); }
  onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

  // Requests permissions to show notifications.
async function requestNotificationsPermissions() {
  console.log('Requesting notifications permission...');
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // Notification permission granted.
    await saveMessagingDeviceToken();
  } else {
    console.log('Unable to get permission to notify.');
  }
}

async function SaveToken(currentToken){
var uid = sessionStorage.getItem("uid");
if(!!uid){
var q = query(collection(db, "People"), where("Uid", "==", uid));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
   SaveTok(doc.id , currentToken);
});
}
else{
var mToken = localStorage.getItem('mToken');
if(mToken){
console.log('mToken');
}
else{
const docRef = await addDoc(collection(db, "Unknown"), {
  Token: currentToken
});
localStorage.setItem('mToken', true);
}
}
}

async function SaveTok(id, tok){
await updateDoc(doc(db, 'People', id), {
    Token: tok
});
localStorage.setItem('mToken', true);
}
requestNotificationsPermissions();
