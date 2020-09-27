import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '../../../components/layout/Layout';
import Private from '../../../components/auth/Private';
import CreateBlog from '../../../components/crud/CreateBlog'
import '../../admin/crud/admin-crud.scss';

const UserCreateBlog = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Create a Blog</title>
            </Head>
            <Layout>
                <Private>
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
                </Private>
            </Layout>
        </Fragment>
    )
}

export default UserCreateBlog;