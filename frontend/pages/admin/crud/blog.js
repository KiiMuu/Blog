import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import CreateBlog from '../../../components/crud/CreateBlog'
import './admin-crud.scss';

const Blog = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Create a Blog</title>
            </Head>
            <Layout>
                <Admin>
                    <div className="blog uk-margin-medium-top">
                        <div className="uk-container">
                            <div className="blog-heading uk-text-center">
                                <h2>Create a new blog</h2>
                            </div>
                            <div data-uk-grid>
                                <CreateBlog />
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        </Fragment>
    )
}

export default Blog;