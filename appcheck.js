const { initializeApp } = require("firebase/app");
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const app = initializeApp({
    // Your firebase configuration object
    apiKey: "AIzaSyAN-X9u7n7QnM8RLrVV4YnXq2MmVz6WNfw",
    authDomain: "em-issyoo.firebaseapp.com",
    projectId: "em-issyoo",
    storageBucket: "em-issyoo.appspot.com",
    messagingSenderId: "33480809995",
    appId: "1:33480809995:web:74df1e056f7638d0b5310e",
    measurementId: "G-C64NWHRT0Y"
});

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lfu-TIjAAAAADdbgf8JH7XshoGYfawqWxZBW6ml'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});