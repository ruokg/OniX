import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         GoogleAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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
const provider = new GoogleAuthProvider();
const user = auth.currentUser;


// logged in and logged out sections
const loggedInView = document.getElementById('logged-in-view')
const loggedOutView = document.getElementById('logged-out-view')
const userEmail = document.getElementById('user-email')

// email and password for signin
const emailSignInForm = document.getElementById('signin-email-input')
const passwordSignInForm = document.getElementById('signin-password-input')

// email and password for signup
const emailSignUpForm = document.getElementById('signup-email-input')
const passwordSignUpForm = document.getElementById('signup-password-input')

// Buttons
const signInGoogleBtn = document.getElementById('sign-in-with-google-btn')
const signUpGoogleBtn = document.getElementById('sign-up-with-google-btn')
const googleBtns = [signInGoogleBtn, signUpGoogleBtn]

const createAccountBtn = document.getElementById('sign-up-btn')
const loginBtn = document.getElementById('sign-in-btn')
const logoutBtn = document.getElementById('logout-button')


// Detects state change
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      updateUserProfile(user);

      const uid = user.uid;
      const email = user.email
      loggedInView.style.display = 'block'
      userEmail.innerText = email
      loggedOutView.style.display = 'none'
      // ...
    } else {
      // User is signed out
      // ...
      loggedInView.style.display = 'none'
      loggedOutView.style.display = 'block'
    }
  });


// Event Listeners for Buttons
// Click on Create Account Button
createAccountBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailSignUpForm.value, passwordSignUpForm.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    console.log('Create Account Button Clicked')
    console.log(`Email: ${emailSignUpForm.value}`)
    console.log(`Password: ${passwordSignUpForm.value}`)
})

// Click on Login Button
loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailSignInForm.value, passwordSignInForm.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });

    console.log('Login Clicked')
    console.log(`Email: ${emailSignInForm.value}`)
    console.log(`Password: ${passwordSignInForm.value}`)
})

// Click on Google Signin
googleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        console.log('Google Signin Clicked');
    });
});

function updateUserProfile(user) {
    const userName = user.displayName;
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

// logout button
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
    console.log('Logout Clicked')
})
