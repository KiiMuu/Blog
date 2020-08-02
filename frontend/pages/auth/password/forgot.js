import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { forgotPassword } from '../../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '../index.scss';

const ForgotPassword = () => {

    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({
            ...values,
            message: '',
            error: '',
            [name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        setValues({
            ...values,
            message: '',
            error: '',
        });

        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,
                    message: data.message,
                    email: '',
                    showForm: false
                });
            }
        });
    }

    const handleMouseMove = () => {
        setValues({
            ...values,
            error: '',
            message: ''
        });
    }

    // messages
    const showError = () => {
        if (error) {
            return (
                <div className="alert-message" onMouseMove={handleMouseMove}>
                    <p 
                        className="message error"
                        style={{
                            opacity: error ? '1' : '0'
                        }}
                    >{error} <span><FontAwesomeIcon icon={faExclamationCircle} /></span></p>
                </div>
            )
        }
    }

    const showMessage = () => {
        if (message) {
            return (
                <div className="alert-message">
                    <p 
                        className="message success sent-message"
                        style={{
                            opacity: message ? '1' : '0'
                        }}
                    >{message} <span><FontAwesomeIcon icon={faCheckCircle} /></span></p>
                </div>
            )
        }
    }

    const passwordForgotForm = () => {
        return (
            <div className="reset_pass-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label className="uk-form-label uk-text-uppercase" htmlFor="email">Email</label>
                        <div className="uk-form-controls">
                            <input
                                className="uk-input uk-margin-small-bottom"
                                id="email"
                                type="email"
                                placeholder="Type your email"
                                onChange={handleChange('email')}
                                value={email}
                            />
                        </div>
                    </div>
                    <div className="reset_pass-btn">
                        <button className="uk-text-uppercase" type="submit">Send Reset Link</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <Layout>
            <div className="reset-pass uk-margin-medium-top">
                <div className="uk-container uk-container-small">
                    <h2 className="uk-text-uppercase uk-text-center">Forgot password</h2>
                    {showError()}
                    {showMessage()}
                    {showForm && passwordForgotForm()}
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword;