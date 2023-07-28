import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);

    const logGoogleUserPopup = async () => {
        // destruc response
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    };

    const hide = {
        display: 'none'
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUserPopup}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect} style={hide}>
                Sign in with Google Redirect
            </button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;