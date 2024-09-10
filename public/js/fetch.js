import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

 const firebaseConfig = {
   apiKey: "AIzaSyDY36HyaLbQ3xn27jnHfmhPsuwK9Tdv09Y",
   authDomain: "onix-proyect-4f8c5.firebaseapp.com",
   projectId: "onix-proyect-4f8c5",
   storageBucket: "onix-proyect-4f8c5.appspot.com",
   messagingSenderId: "520123890334",
   appId: "1:520123890334:web:4b8d8c485de82eec40198f"
 };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const loggedInView = document.getElementById('logged-in-view')
const loggedOutView = document.getElementById('logged-out-view')
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
      updateUserProfile(user);
      const uid = user.uid;
    } else {

      loggedInView.style.display = 'none'
      loggedOutView.style.display = 'block'
    }
  });

  function updateUserProfile(user) {
    const userPicture = user.photoURL;

    document.getElementById("userPicture").src = userPicture;
}