import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { getTag } from '../../actions/tag';
import '../categories/index.scss';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faClock } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs, query }) => {

    const head = () => (
        <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta 
                name="description" 
                content={`Best programming tuts on ${tag.name}`} 
            />
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta 
                property="og:description" 
                content={`Best programming tuts on ${tag.name}`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="uk-container">
                        <header className="uk-text-center uk-margin-medium-top">
                            <h2 className="uk-text-uppercase">{tag.name}</h2>
                        </header>
                        <div className="tag-blogs">
                            {blogs.length === 0 ? <div className="n-blogs">This tag has no blogs yet.</div> : <div className="uk-grid-small" data-uk-grid>
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

Tag.getInitialProps = ({ query }) => {
    return getTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                tag: data.tag,
                blogs: data.blogs,
                query
            }
        }
    });
}

export default Tag;