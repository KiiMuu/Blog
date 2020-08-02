import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
    return (
        <Layout>
            <div className="uk-container uk-container-small uk-margin-medium-top">
                <ContactForm />
            </div>
        </Layout>
    )
}

export default Contact;