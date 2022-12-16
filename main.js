import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import {
    getFirestore, Timestamp, doc, getDoc, getDocs, limit, orderBy, query, where, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot, arrayUnion
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

import {
    getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signOut

} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

import {
    getStorage, ref as sRef, uploadBytesResumable, getDownloadURL

} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...
};

const app = initializeApp({
    apiKey: "AIzaSyAN-X9u7n7QnM8RLrVV4YnXq2MmVz6WNfw",
    authDomain: "em-issyoo.firebaseapp.com",
    projectId: "em-issyoo",
    storageBucket: "em-issyoo.appspot.com",
    messagingSenderId: "33480809995",
    appId: "1:33480809995:web:74df1e056f7638d0b5310e",
    measurementId: "G-C64NWHRT0Y"
});

const analytics = getAnalytics(app);

const auth = getAuth();

const db = getFirestore();

var attch;
async function newData() {

    var uid = sessionStorage.getItem('uid');

    const citiesRef = collection(db, "Public");
    const q = query(citiesRef, where('Type', '==', 'content'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New msg: " + change.doc.data());
                var div = document.createElement('div');
                var div = document.createElement('div');
                var cont = document.createElement('div');
                cont.appendChild(div);
                document.getElementById("body").appendChild(cont);
                if (!!change.doc.data().FileTyp) { var ffl = change.doc.data().FileTyp; }
                else { ffl = 'iframe'; }
                let ifrm = document.createElement(ffl);
                ifrm.setAttribute("src", change.doc.data().Url);
                div.setAttribute('id', change.doc.id);
                ifrm.controls = false;
                div.onclick = openCont;
                div.appendChild(ifrm);
                var title = document.createElement('span');
                var img = document.createElement('img');
                title.appendChild(img);
                img.style.height = '40px';
                img.style.width = '40px';
                img.style.borderRadius = '23px';
                var ttlbox = document.createElement('span');
                title.appendChild(ttlbox);
                var ttl = document.createElement('span');
                ttlbox.appendChild(ttl);
                ttlbox.setAttribute("class", 'infobox');
                ttl.setAttribute("class", 'tname');
                ttl.innerHTML = change.doc.data().Title;
                var nam = document.createElement('span');
                nam.setAttribute("class", 'name');
                ttlbox.appendChild(nam);
                moreData(change.doc.data().Uid, img, nam);
                let moreBtn = document.createElement('span');
                moreBtn.setAttribute("class", 'material-symbols-outlined moreBtn');
                moreBtn.innerHTML = 'more_vert';
                //title.innerHTML = `<img style='width:39px; height:39px; border-radius:23px;' src=${moreData(change.doc.data().Uid).Pic}> <p>${change.doc.data().Title}</p><br><p>${moreData(change.doc.data().Uid).Name}</p>`;
                var tbox = document.createElement('span');
                tbox.appendChild(title)
                cont.appendChild(tbox);
                tbox.appendChild(moreBtn);
                tbox.setAttribute("class", 'tBox');
                ifrm.setAttribute("class", 'ifrm');
                title.setAttribute("class", 'title');
                div.setAttribute('class', 'cont');
                cont.setAttribute("class", 'box');
            }
            if (change.type === "modified") {
                alert("Modified msg: " + change.doc.data().Msg);
            }
            if (change.type === "removed") {
                // alert("Removed msg: "+ change.doc.data().Msg);
                document.getElementById(change.doc.id).parentElement.remove();
            }
        });
    });
}
async function moreData(id, img, nam) {
    const q = query(collection(db, "Public"), where("Uid", "==", id), where('Type', '==', 'user'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        img.src = doc.data().Pic;
        img.onclick = e => { window.open('/'+this.id,'_self')}
        nam.innerHTML = doc.data().Name;
    });
}

function openCont() {
    location.href = location.href + 'watch?i=' + this.id;
}
async function Signout() {
    signOut(auth).then(() => {
        localStorage.removeItem("uid");
        sessionStorage.removeItem("uid");
        //alert(" Sign-out successful.");
        window.open("/signin.html", "_self");
    }).catch((error) => {
        alert(" An error happened.");
    });
}

document.getElementById("signout").addEventListener("click", Signout);


async function getProfilePic() {

    var uid = sessionStorage.getItem("uid");

    var q = query(collection(db, "People"), where("Uid", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots

        const name = doc.data().Name;
        const pPic = doc.data().Pic;
        var profBox = document.getElementById('profile');
        if (!!pPic) {
            profBox.href = '/profile.html';
            profBox.innerHTML = `<img src=${pPic} style='width:27px; height:27px; border-radius:23px;'>`;
        }
        else {
            profBox.href = '/profile.html';
            profBox.innerHTML = `<span class='material-symbols-outlined'>account_circle</span>`;
        }
    });
}
if (!!sessionStorage.getItem("uid")) {
    getProfilePic();
}
else {
    document.getElementById('profile').innerHTML = `<span class='material-symbols-outlined' onclick='window.open("/signin.html","_self")'>account_circle</span>`;
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
    newData();
function createRipple() {

  const button = event.currentTarget;

  const circle = document.createElement("span");

  const diameter = Math.max(button.clientWidth, button.clientHeight);

  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;

  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;

  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;

  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {

    ripple.remove();

  }

  button.appendChild(circle);
}

const divs = document.getElementsByClassName("div");
for (const div of divs) {
  div.addEventListener("touchstart", createRipple);
}
