import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUserAlt, faKey, faLongArrowAltRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './Auth.scss';
import { signup, isAuth } from '../../actions/auth';
import Spinner from '../layout/spinner/Spinner';

const SignupComponent = () => {

    const [isTyped, setIsTyped] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

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
            error: false
        });
        const user = { name, email, password };

        signup(user).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        })
    }    

    const showLoading = () => loading ? <Spinner /> : '';
    const showError = () => error ? <div className="error"><span><FontAwesomeIcon icon={faExclamationCircle} /></span> {error}</div> : '';
    const showMessage = () => message ? <div className="message">{message}</div> : '';

    const signupForm = () => {
        return (
            <div className="signup-form">
                {showLoading()}
                <div className="form-heading uk-text-center">
                    <h2 className="uk-text-uppercase">Signup</h2>
                    <p className="uk-text-muted">Register with a new account</p>
                </div>
                {showError()}
                {showMessage()}
                <div className="inputs">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="uk-grid-small uk-child-width-1-1@s" data-uk-grid>
                            <div className="input">
                                <label 
                                    style={{
                                        opacity: (isTyped && document.activeElement.id === 'name') ? '1' : '0',
                                        left: isTyped ? '0' : '', 
                                        transition: '.2s ease-in-out'
                                    }}
                                >Name</label>
                                <input 
                                    className="uk-input"
                                    type="text"
                                    id="name"
                                    placeholder="Type your name"
                                    value={name}
                                    onChange={handleChange('name')}
                                    onKeyPress={() => setIsTyped(true)}
                                    onBlur={() => setIsTyped(false)}
                                />
                                <span className="border"></span>
                                <span><FontAwesomeIcon icon={faUserAlt} /></span>
                            </div>
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
                            <div className="signup-control">
                                <div className="uk-child-width-1-2 uk-flex uk-flex-middle" data-uk-grid>
                                    <div className="signup-btn uk-text-left">
                                        <button type="submit">Sign Up</button>
                                    </div>
                                    <div className="signin-btn uk-text-right">
                                        <Link href="/signin">
                                            <a>Sign In?</a>
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
        <div className="signup">
            <div className="uk-container uk-container-small">
                <div className="uk-child-width-1-1@m uk-flex uk-flex-stretch" data-uk-grid>
                    {showForm &&  signupForm()}
                </div>
            </div>
        </div>
    )
}

export default SignupComponent;
