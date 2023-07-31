import { useState, useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import { auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);

    const signInWithGoogle = async () => {
        // destructure response
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    // const hide = {
    //     display: 'none'
    // };

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log('user: ', user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert('Incorrect password for email');
                    break;
                case "auth/user-not-found":
                    alert('No account associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            {/* <button onClick={logGoogleUserPopup}>
                Sign in with Google Popup
                </button>
                <button onClick={signInWithGoogleRedirect} style={hide}>
                Sign in with Google Redirect
            </button> */}
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" name="email" type="email" onChange={handleChange} value={email} required/>
                <FormInput label="Password" name="password" type="password" onChange={handleChange} value={password} required/>
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;