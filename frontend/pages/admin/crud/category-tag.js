import Layout from '../../../components/layout/Layout';
import Admin from '../../../components/auth/Admin';
import './crud.scss';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="category-tag uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="category_tag-heading uk-text-center">
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div className="uk-grid-small uk-child-width-1-2@m" data-uk-grid>
                            <div>
                                <Category />
                            </div>
                            <div>
                                <Tag />
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default CategoryTag;