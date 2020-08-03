import { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { readBlog, relatedBlogs } from '../../actions/blog';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faClock } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/disqus/DisqusThread';


const singleBlog = ({ blog, query }) => {

    const [related, setRelated] = useState([]);

    const loadRelatedBlogs = () => {
        relatedBlogs({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    }

    useEffect(() => {
        loadRelatedBlogs();
    }, []);

    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta 
                name="description" 
                content={blog.mdesc} 
            />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta 
                property="og:description" 
                content={blog.mdesc}  
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    const showBlogCategories = blog => {
        return blog.categories.map((category, i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <a title={`${category.name} category`}>{category.name}</a>
            </Link>
        ));
    }

    const showBlogTags = blog => {
        return blog.tags.map((tag, i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a title={`${tag.name} tag`}>#{tag.name}</a>
            </Link>
        ));
    }

    const showRelatedBlogs = () => {
        return related.map((blog, i) => {
            return <article className="uk-width-1-2@m uk-width-1-1" key={i}>
                <SmallCard blog={blog} />
            </article>
        });
    }

    const showComments = () => {
        return (
            <Fragment>
                <DisqusThread 
                    id={blog.id} 
                    title={blog.title} 
                    path={`/blog/${blog.slug}`}
                />
            </Fragment>
        )
    }

    return <Fragment>
        {head()}
        <Layout>
            <main>
                <article>
                    <section className="blog-img">
                        <img 
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            draggable="false" 
                        />
                    </section>
                    <div className="uk-container uk-container-small">
                        <div data-uk-grid>
                            <div className="uk-width-1-1@m">
                                <section className="blog-content uk-margin-medium-top">
                                    <div className="blog-title">
                                        <h2 className="uk-text-uppercase">{blog.title}</h2>
                                    </div>
                                    <div className="creator">
                                        <p><span className="creator-icon"><FontAwesomeIcon icon={faPen} /></span> <span>Blogger</span>: <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.name}</a></Link></p>
                                        <p><span className="creator-icon"><FontAwesomeIcon icon={faClock} /></span> Published {moment(blog.createdAt).fromNow()}</p>
                                    </div>
                                    <div className="blog-tags-cats">
                                        <div className="cats">
                                            <div>{showBlogCategories(blog)}</div>
                                        </div>
                                        <div className="tags">
                                            <div>{showBlogTags(blog)}</div>
                                        </div>
                                    </div>
                                    <div className="blog-body">
                                        {renderHTML(blog.body)}
                                    </div>
                                    <div className="related-blogs">
                                        <h4 className="uk-text-uppercase">Related Blogs</h4>
                                        <div className="uk-grid-small" data-uk-grid>
                                            {related.length === 0 ? <p className="has-no-related">This blog has no related blogs</p> : showRelatedBlogs()}
                                        </div>
                                    </div>
                                    <div className="blog-comments">
                                        <h4 className="uk-text-uppercase">Share you thoughts</h4>
                                        {showComments()}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </Layout>
    </Fragment>
}

singleBlog.getInitialProps = ({ query }) => {
    return readBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blog: data,
                query
            }
        }
    });
}

export default singleBlog;