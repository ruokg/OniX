  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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


  const googleLogin = document.getElementById("google-login-btn");
  googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    window.location.href = "/public/login/logged.html"

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  })

  const googleSignin = document.getElementById("google-signin-btn");
  googleSignin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    window.location.href = "/public/login/logged.html"

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  })

  updateUserProfile()

//https://firebase.google.com/docs/auth/web/start?hl=es-419