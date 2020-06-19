import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import './crud.scss';
import Category from '../../../components/crud/category/Category';

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="category-tag uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="dash-heading">
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div data-uk-grid>
                            <div className="uk-width-1-2@m">
                                <Category />
                            </div>
                            <div className="uk-child-1-2@m">
                                <p>Tags</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default CategoryTag;