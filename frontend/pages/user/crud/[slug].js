import Layout from '../../../components/layout/Layout';
import Private from '../../../components/auth/Private';
import BlogUpdate from '../../../components/crud/BlogUpdate'
import '../../admin/crud/admin-crud.scss';

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="blog uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="blog-heading uk-text-center">
                            <h2>Update blog</h2>
                        </div>
                        <div data-uk-grid>
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default Blog;