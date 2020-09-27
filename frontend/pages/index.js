import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import './index.scss';

const Index = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Home</title>
            </Head>
            <Layout>
                <div className="home-page uk-margin-large-top">
                    <div className="uk-container uk-container-small">
                        <h1 className="uk-text-center uk-text-uppercase">Bloggawy for technical and programming blog tutorials</h1>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Index;