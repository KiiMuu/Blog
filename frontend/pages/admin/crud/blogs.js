import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import ReadBlogs from '../../../components/crud/ReadBlogs'
import './admin-crud.scss';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="blogs uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="blogs-heading uk-text-center">
                            <h2>Manage blogs</h2>
                        </div>
                        <div data-uk-grid>
                            <ReadBlogs />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog;