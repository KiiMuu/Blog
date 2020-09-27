import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import ReadBlogs from '../../../components/crud/ReadBlogs'
import './admin-crud.scss';

const Blog = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Blogs</title>
            </Head>
            <Layout>
                <Admin>
                    <div className="blogs uk-margin-medium-top">
                        <div className="uk-container">
                            <div className="blogs-heading uk-text-center">
                                <h2>Manage blogs</h2>
                            </div>
                            <div className="uk-grid-small" data-uk-grid>
                                <ReadBlogs />
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        </Fragment>
    )
}

export default Blog;