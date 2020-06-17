import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLongArrowAltRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Auth.scss';
import { signin, authenticate } from '../../actions/auth';
import Spinner from '../layout/spinner/Spinner';

const SigninComponent = () => {

    const [isTyped, setIsTyped] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

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
                    Router.push('/');
                });
            }
        })
    }    

    const showLoading = () => loading ? <Spinner /> : '';
    const showError = () => error ? <div className="error"><span><FontAwesomeIcon icon={faExclamationCircle} /></span> {error}</div> : '';
    const showMessage = () => message ? <div className="message">{message}</div> : '';

    const signinForm = () => {
        return (
            <div className="signin-form">
                <div className="form-heading uk-text-center">
                    <h2 className="uk-text-uppercase">Signin</h2>
                    <p className="uk-text-muted">Login with a your current account</p>
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
                                        transition: '.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
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
                                        transition: '.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
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
                                        <button type="submit">Sign In</button>
                                    </div>
                                    <div className="signup-btn uk-text-right">
                                        <Link href="/signup">
                                            <a>Sign Up?</a>
                                        </Link>
                                        <span><FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                                    </div>
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
                    {showLoading()}
                    {showForm &&  signinForm()}
                </div>
            </div>
        </div>
    )
}

export default SigninComponent;
