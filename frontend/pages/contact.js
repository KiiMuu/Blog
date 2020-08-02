import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
    return (
        <Layout>
            <div className="uk-container">
                <h3>Contact Form</h3>
                <ContactForm />
            </div>
        </Layout>
    )
}

export default Contact;