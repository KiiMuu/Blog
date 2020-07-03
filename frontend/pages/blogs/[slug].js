import { useState, Fragment } from 'react';
import Head from 'next/head';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { readBlog } from '../../actions/blog';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";


const singleBlog = ({ blog, query }) => {

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
                <a>{category.name}</a>
            </Link>
        ));
    }

    const showBlogTags = blog => {
        return blog.tags.map((tag, i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a>#{tag.name}</a>
            </Link>
        ));
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
                    <section className="blog-content">
                        <div className="uk-container">
                            <div className="blog-title">
                                <h2>{blog.title}</h2>
                            </div>
                            <div className="creator">
                                <p><span>Blogger</span>: {blog.postedBy.name}</p>
                                <p>Published {moment(blog.createdAt).fromNow()}</p>
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
                                <h4>Related Blogs</h4>
                                <p>show related blogs</p>
                            </div>
                            <div className="blog-comments">
                                <p>blog comments</p>
                            </div>
                        </div>
                    </section>
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