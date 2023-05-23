import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxwUY2wrN8un5ksN3IWaD3hTy_jWmaqtI",
    authDomain: "crwn-clothing-db-b430b.firebaseapp.com",
    projectId: "crwn-clothing-db-b430b",
    storageBucket: "crwn-clothing-db-b430b.appspot.com",
    messagingSenderId: "633491264369",
    appId: "1:633491264369:web:da434972e6b71955049cd0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// this has an association with firebaseApp initialized with the config object
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // check for already existing document ref
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, photoURL, createdAt });
        } catch (error) {
            console.log('error creating the user: ', error.message);
        }
    }

    return userDocRef;
};