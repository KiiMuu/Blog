import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import CreateBlog from '../../../components/crud/CreateBlog'
import './admin-crud.scss';

const Blog = () => {
    return (
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
    )
}

export default Blog;