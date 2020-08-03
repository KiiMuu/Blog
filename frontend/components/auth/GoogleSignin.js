import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLongArrowAltRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Auth.scss';
import { signInWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import GoogleSignin from 'react-google-login';

const SigninWithGoogle = () => {

    const responseGoogle = response => {
        console.log(response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        signInWithGoogle(user).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin');
                    } else {
                        Router.push('/user');
                    }
                });
            }
        });
    }

    return <div className="signin-with-google">
        <GoogleSignin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Signin"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
        />
    </div>
}

export default SigninWithGoogle;
