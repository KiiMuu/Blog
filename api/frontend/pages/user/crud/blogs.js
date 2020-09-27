import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '../../../components/layout/Layout';
import Private from '../../../components/auth/Private';
import ReadBlogs from '../../../components/crud/ReadBlogs'
import '../../admin/crud/admin-crud.scss';
import { isAuth } from '../../../actions/auth';

const Blog = () => {

    const username = isAuth() && isAuth().username;

    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Blogs</title>
            </Head>
            <Layout>
                <Private>
                    <div className="blogs uk-margin-medium-top">
                        <div className="uk-container">
                            <div className="blogs-heading uk-text-center">
                                <h2>Manage blogs</h2>
                            </div>
                            <div className="uk-grid-small" data-uk-grid>
                                <ReadBlogs username={username} />
                            </div>
                        </div>
                    </div>
                </Private>
            </Layout>
        </Fragment>
    )
}

export default Blog;