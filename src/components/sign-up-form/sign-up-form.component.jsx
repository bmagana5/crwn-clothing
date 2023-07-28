import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(displayName, email, password, confirmPassword);
        if (password === confirmPassword) {
            console.log('passwords match');
            try {
                const {user} = await createAuthUserWithEmailAndPassword(email, password);
                const userDocRef = await createUserDocumentFromAuth(user, { displayName, photoURL: '' });
                console.log(userDocRef);
                resetFormFields();
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user. Email already in use.');
                } else {
                    console.log('error creating user with email and password: ', error.message);
                }
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" name="displayName" type="text" onChange={handleChange} value={displayName} required/>
                <FormInput label="Email" name="email" type="email" onChange={handleChange} value={email} required/>
                <FormInput label="Password" name="password" type="password" onChange={handleChange} value={password} required/>
                <FormInput label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} value={password} required/>
                <Button type="submit">Sign Up</Button>
            </form>

        </div>
    );
};

export default SignUpForm;