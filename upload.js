<script type="module">

  // Import the functions you need from the SDKs you need

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

  // Initialize Firebase

  

  import{

      getFirestore,Timestamp , doc, getDoc, getDocs, limit, orderBy, query, where, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot, arrayUnion

  }from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

  import { getAuth, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider , signOut

  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

import { getStorage, ref as sRef, uploadBytesResumable , getDownloadURL

  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

   const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);

  const auth = getAuth();

  const db = getFirestore();

   const storage = getStorage();

   var attch;

   

   

   var files = [];

      var namebox = document.getElementById("name");

      var extlab = document.getElementById("extlab");

      var proglab = document.getElementById("upprogress");

      var upBtn = document.getElementById("upbtn");

      var dBtn = document.getElementById("dbtn");

      var reader = new FileReader();

      var inpt = document.createElement("input");

      inpt.type = "file";

      

      var filtyp = "";

      var attch = false;

      var pst = document.getElementById("pst");

      var url = "";

      

      inpt.onchange = e =>{

        files = e.target.files;

        var extension = GetFileExt(files[0]);

        var name = GetFileName(files[0]);

        namebox.innerHTML = name;

        document.getElementById("title").value = name;

        extlab.innerHTML = extension;

        reader.readAsDataURL(files[0]);

        

document.getElementById("attach").style.display = 'none';

      document.getElementById("send").hidden = false;

      document.getElementById("inp").hidden = false;

      }

      

      reader.onload = function (){

     var ftg = document.createElement(filtyp);

        ftg.setAttribute("src",  reader.result);

       ftg.setAttribute("id", "ifr");

        document.getElementById("atch").appendChild(ftg);

        ftg.style.maxHeight = "50%";

         ftg.style.maxWidth = "30%";

       document.getElementById("pst").hidden = false;

        if( filtyp == "video" || filtyp == "audio" ){

          ftg.controls = true;

        }

      }

      

  function clk(){

    inpt.click();

   

  }

   function GetFileExt(file){

    var temp = file.name.split('.');

    var ext = temp.slice((temp.length-1),(temp.length));

    return '.' + ext[0];

    }

    function GetFileName(file){

    var temp = file.name.split("0");

    var fname = temp.slice(0,-1).join('.');

    return fname;

    }

    

   async function UploadProcess(id) { 

   document.getElementById("send").style.display = 'none';

   document.getElementById("inp").hidden = true;

    var ImgToUpload = files [0];

var ImgName = namebox.innerHTML + extlab.innerHTML;

const metaData = {

contentType: ImgToUpload.type

}

const stroageRef = sRef(storage, "Images/"+ Math.random().toString());

const UploadTask = uploadBytesResumable (stroageRef, ImgToUpload, metaData);

document.getElementById("pause").onclick = UploadTask.pause;

document.getElementById("pause").addEventListener("click" , function () {

document.getElementById("pause").hidden = true;

document.getElementById("play").hidden = false;

});

document.getElementById("play").onclick = UploadTask.resume;

document.getElementById("play").addEventListener("click", function (){

// Resume the upload

document.getElementById("pause").hidden = false;

document.getElementById("play").hidden = true;

});

document.getElementById("stop").onclick = UploadTask.cancel;

document.getElementById("stop").addEventListener("click", function (){

// Cancel the upload

cancelUp();

});

UploadTask.on('state-changed', (snapshot) =>{ 

var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

if( progress != 100){

document.getElementById("controls").hidden = false;

proglab.style.width = ( progress * 80 / 100 ) + "vw";

proglab.innerHTML = progress + '%';

switch (snapshot.state) {

      case 'paused':

        console.log('Upload is paused');

        break;

      case 'running':

        console.log('Upload is running');

        break;

    }

}

else{

document.getElementById("controls").hidden = false;

 // cancelUp();

}

},

(error) =>{

alert("error in uploading image: " + error);

},

() => {

  getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {

    SaveDownloadURL(downloadURL);

  })

}

);

}

   

   async function SaveDownloadURL(url){

  var name = namebox.innerHTML;

  var ext = extlab.innerHTML;

  

const docRef = await addDoc(collection(db, "Public"), {

  Time: Timestamp.fromDate(new Date()),

              Type: 'content',

              FileTyp: filtyp,

              Description: document.getElementById("descrip").value,

              Title: document.getElementById("title").value,

              ImgName: (name+ext),

              Uid: sessionStorage.getItem('uid'),

              Url: url,

              Time: Timestamp.fromDate(new Date())

});

  

  attch = false;

    filtyp = filtyp;

    console.log("true");

cancelUp();

  }

    function cancelUp(){

      filtyp ="";

      proglab.style.width = 0;

      extlab.innerHTML = "";

      namebox.innerHTML = "";

      attch = "";

      document.getElementById("send").style.display = '';

      document.getElementById("attach").style.display = 'flex';

      

      document.getElementById("pst").hidden = true;

      document.getElementById("ifr").remove();

    }

document.getElementById("image").addEventListener("click", function(){

      attch = true;

      filtyp = 'img';

      inpt.accept = 'image/*';

      clk();

    })

document.getElementById("video").addEventListener("click", function(){

      attch = true;

      filtyp = 'video';

      inpt.accept = 'video/*';

      clk();

    })

document.getElementById("audio").addEventListener("click", function(){

      attch = true;

      filtyp = 'audio';

      inpt.accept = 'audio/*';

      clk();

    })

document.getElementById("dbtn").addEventListener("click", cancelUp);

   document.getElementById("send").addEventListener("click", UploadProcess);

</script>
