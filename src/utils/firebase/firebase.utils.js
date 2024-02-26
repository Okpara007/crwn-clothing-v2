import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdBzgv4Tj74SDi5CNAtxMlXgH4spl60qk",
    authDomain: "crwn-clothing-db-923b2.firebaseapp.com",
    projectId: "crwn-clothing-db-923b2",
    storageBucket: "crwn-clothing-db-923b2.appspot.com",
    messagingSenderId: "942828206891",
    appId: "1:942828206891:web:51ffa43d4f65e14c14236e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
  }