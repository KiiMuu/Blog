import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import SignupComponent from '../components/auth/SignupComponent';

const SignUp = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | SignUp</title>
            </Head>
            <Layout>
                <SignupComponent />
            </Layout>
        </Fragment>
    )
}

export default SignUp;