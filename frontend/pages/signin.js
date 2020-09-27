import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const SignIn = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | SignIn</title>
            </Head>
            <Layout>
                <SigninComponent />
            </Layout>
        </Fragment>
    )
}

export default SignIn;