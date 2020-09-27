import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Contact</title>
            </Head>
            <Layout>
                <div className="uk-container uk-container-small uk-margin-medium-top">
                    <h2 className="uk-text-center uk-text-uppercase contact-heading">Be in Touch</h2>
                    <ContactForm />
                </div>
            </Layout>
        </Fragment>
    )
}

export default Contact;