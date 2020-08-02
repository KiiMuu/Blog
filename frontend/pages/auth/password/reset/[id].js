import { useState, useEffect } from 'react';
import Layout from '../../../../components/layout/Layout';
import { resetPassword } from '../../../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'next/router';
import '../../index.scss';

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });

    const { name, newPassword, message, error, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();

        resetPassword({ 
            newPassword,
            resetPasswordLink: router.query.id
         }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,
                    message: data.message,
                    newPassword: '',
                    showForm: false,
                    error: false
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

    const passwordResetForm = () => {
        return (
            <div className="reset_pass-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label className="uk-form-label uk-text-uppercase" htmlFor="password">Password</label>
                        <div className="uk-form-controls">
                            <input
                                className="uk-input uk-margin-small-bottom"
                                id="password"
                                type="password"
                                placeholder="Type your new password"
                                onChange={e => setValues({...values, newPassword: e.target.value})}
                                value={newPassword}
                            />
                        </div>
                    </div>
                    <div className="reset_pass-btn">
                        <button className="uk-text-uppercase" type="submit">Change</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <Layout>
            <div className="reset-pass uk-margin-medium-top">
                <div className="uk-container uk-container-small">
                    <h2 className="uk-text-uppercase uk-text-center">Reset password</h2>
                    {showError()}
                    {showMessage()}
                    {showForm && passwordResetForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(ResetPassword);