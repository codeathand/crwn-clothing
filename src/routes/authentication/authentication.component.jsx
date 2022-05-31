import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-fom.component";
import SignInForm from "../../components/sign-in-form/sign-in-fom.component";

import './authentication.styles.scss';

const Authentication = () => {
    useEffect(() => {
        async function getResponse() {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getResponse();
    }, []);

    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }

    return (
        <div className="authentication-container">
            {/* <h1>Sign In page</h1> */}
            {/* <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button> */}
            <SignInForm />
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication;