import { useState, Fragment } from 'react';
import { contactForm } from '../../actions/contactform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import './ContactForm.scss';

const ContactForm = ({ authorEmail }) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        sent: false,
        buttonText: 'Send',
        success: false,
        error: false
    });

    const { name, email, message, buttonText, success, error } = values;

    const handleSubmit = e => {
        e.preventDefault();

        setValues({
            ...values,
            buttonText: 'Sending...'
        });

        contactForm({ authorEmail, name, email, message }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    message: '',
                    sent: true,
                    success: true,
                    buttonText: 'Sent'
                });
            }
        });
    }

    const handleMouseMove = () => {
        setValues({
            ...values,
            error: false,
            success: false
        });
    }

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert-message" onMouseMove={handleMouseMove}>
                    <p 
                        className="message success"
                        style={{
                            opacity: success ? '1' : '0'
                        }}
                    >Sent. Thanks for contacting us <span><FontAwesomeIcon icon={faStar} /></span></p>
                </div>
            )
        }
    }

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

    const handleChange = name => e => {
        setValues({
            ...values,
            [name]: e.target.value,
            error: false,
            success: false,
            buttonText: 'Send'
        });
    }

    const contactFormContent = () => {
        return (
            <form onSubmit={handleSubmit} noValidate>
                {showSuccess()}
                {showError()}
                <div className="uk-grid-small" data-uk-grid>
                    <div className="input uk-width-1-2@m">
                        <label htmlFor="name">Name</label>
                        <input 
                            className="uk-input"
                            type="text" 
                            id="name"
                            placeholder="Type your Name"
                            value={name}
                            onChange={handleChange('name')}
                        />
                    </div>
                    <div className="input uk-width-1-2@m">
                        <label htmlFor="email">Email</label>
                        <input 
                            className="uk-input"
                            type="email" 
                            id="email"
                            placeholder="Type your email"
                            value={email}
                            onChange={handleChange('email')}
                        />
                    </div>
                    <div className="input uk-width-1-1@m">
                        <label htmlFor="message">Leave a Message</label>
                        <textarea 
                            className="uk-input"
                            type="text" 
                            id="message"
                            placeholder="Type your own message"
                            value={message}
                            onChange={handleChange('message')}
                        ></textarea>
                    </div>
                    <div className="contact_form-control">
                        <button type="submit">{buttonText}</button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <Fragment>
            <div className="contact-form">
                {contactFormContent()}
            </div>
        </Fragment>
    )
}

export default ContactForm;