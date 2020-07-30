import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { getCategory } from '../../actions/category';
import './index.scss';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faClock } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="uk-container">
                        <header className="uk-text-center uk-margin-medium-top">
                            <h2 className="uk-text-uppercase">{category.name}</h2>
                        </header>
                        <div className="category-blogs">
                            {blogs.length === 0 ? <div className="n-blogs">This category has no blogs yet.</div> : <div className="uk-grid-small" data-uk-grid>
                                {blogs.map((blog, i) => {
                                    return <article className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1">
                                        <Card key={i} blog={blog} />
                                    </article>
                                })}
                            </div>}
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Category.getInitialProps = ({ query }) => {
    return getCategory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                category: data.category,
                blogs: data.blogs
            }
        }
    });
}

export default Category;