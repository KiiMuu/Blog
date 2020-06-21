import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import CreateBlog from '../../../components/crud/CreateBlog'
import './crud.scss';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="blog uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="blog-heading uk-text-center">
                            <h2>Create a new blog</h2>
                        </div>
                        <div className="uk-child-width-1-1@m" data-uk-grid>
                            <div>
                                <CreateBlog />
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog;