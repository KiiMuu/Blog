import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
    return (
        <Layout>
            <div className="uk-container uk-container-small uk-margin-medium-top">
                <h2 className="uk-text-center uk-text-uppercase contact-heading">Be in Touch</h2>
                <ContactForm />
            </div>
        </Layout>
    )
}

export default Contact;