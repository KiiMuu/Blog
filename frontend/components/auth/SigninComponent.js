import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLongArrowAltRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Auth.scss';
import { signin, authenticate, isAuth } from '../../actions/auth';

const SigninComponent = ({ router }) => {

    const [isTyped, setIsTyped] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        buttonText: 'Sign in'
    });

    const { email, password, error, loading, message, showForm, buttonText } = values;

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []); 

    const handleChange = name => e => {
        setValues({
            ...values,
            error: false,
            [name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({
            ...values,
            loading: true,
            buttonText: 'Loading...',
            error: false
        });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                // save user token to cookie
                // save user info in localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin');
                    } else {
                        Router.push('/user');
                    }
                });
            }
        })
    }    

    const showError = () => error ? <div className="error"><span><FontAwesomeIcon icon={faExclamationCircle} /></span> {error}</div> : '';
    const showMessage = () => message ? <div className="message">{message}</div> : '';

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <p className="expired-message"><span><FontAwesomeIcon icon={faExclamationCircle} /></span>{router.query.message}</p>
        } else {
            return;
        }
    }

    const signinForm = () => {
        return (
            <div className="signin-form">
                <div className="form-heading uk-text-center">
                    {showRedirectMessage()}
                    <h2 className="uk-text-uppercase">Signin</h2>
                    <p className="uk-text-muted">Login with your current account</p>
                </div>
                {showError()}
                {showMessage()}
                <div className="inputs">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="uk-grid-small uk-child-width-1-1@s" data-uk-grid>
                            <div className="input">
                                <label
                                    style={{
                                        opacity: (isTyped && document.activeElement.id === 'email') ? '1' : '0',
                                        left: isTyped ? '0' : '', 
                                        transition: '.2s ease-in-out'
                                    }}
                                >Email</label>
                                <input 
                                    className="uk-input"
                                    type="email" 
                                    id="email"
                                    placeholder="Type your email"
                                    value={email}
                                    onChange={handleChange('email')}
                                    onKeyPress={() => setIsTyped(true)}
                                    onBlur={() => setIsTyped(false)}
                                />
                                <span className="border"></span>
                                <span><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                            <div className="input">
                                <label
                                    style={{
                                        opacity: (isTyped && document.activeElement.id === 'password') ? '1' : '0',
                                        left: isTyped ? '0' : '', 
                                        transition: '.2s ease-in-out'
                                    }}
                                >Password</label>
                                <input 
                                    className="uk-input"
                                    type="password" 
                                    id="password"
                                    placeholder="Type your password"
                                    value={password}
                                    onChange={handleChange('password')}
                                    onKeyPress={() => setIsTyped(true)}
                                    onBlur={() => setIsTyped(false)}
                                />
                                <span><FontAwesomeIcon icon={faKey} /></span>
                            </div>
                            <div className="signin-control">
                                <div className="uk-child-width-1-2 uk-flex uk-flex-middle" data-uk-grid>
                                    <div className="signin-btn uk-text-left">
                                        <button type="submit">{buttonText}</button>
                                    </div>
                                    <div className="signup-btn uk-text-right">
                                        <Link href="/signup">
                                            <a>Sign Up?</a>
                                        </Link>
                                        <span><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                                    </div>
                                </div>
                                <div className="forgot-btn uk-text-left">
                                    <Link href="/auth/password/forgot">
                                        <a>Forgot Password?</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="signin">
            <div className="uk-container uk-container-small">
                <div className="uk-child-width-1-1@m uk-flex uk-flex-stretch" data-uk-grid>
                    {showForm &&  signinForm()}
                </div>
            </div>
        </div>
    )
}

export default withRouter(SigninComponent);
