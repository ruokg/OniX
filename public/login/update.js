import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDY36HyaLbQ3xn27jnHfmhPsuwK9Tdv09Y",
    authDomain: "onix-proyect-4f8c5.firebaseapp.com",
    projectId: "onix-proyect-4f8c5",
    storageBucket: "onix-proyect-4f8c5.appspot.com",
    messagingSenderId: "520123890334",
    appId: "1:520123890334:web:4b8d8c485de82eec40198f"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'es';
  const provider = new GoogleAuthProvider();

const user = auth.currentUser;

function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    } else{
        alert("Create Account & Login");
        window.location.href = "./register.html";
    }
})