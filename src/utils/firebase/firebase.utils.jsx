import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth';
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// this has an association with firebaseApp initialized with the config object
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    // check for already existing document ref
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, photoURL, createdAt, ...additionalInformation });
        } catch (error) {
            console.log('error creating the user: ', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!(email && password)) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!(email && password)) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
    if (!callback) return;
    onAuthStateChanged(auth, callback);
};
