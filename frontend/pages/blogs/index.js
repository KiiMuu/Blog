import { useState, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { blogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import Link from 'next/link';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";

const Blogs = ({ blogs, categories, tags, size, router }) => {

    const head = () => (
        <Head>
            <title>Programming blog | {APP_NAME}</title>
            <meta 
                name="description" 
                content="Programming blogs - react node" 
            />
            <link rel="canonical" href={`${DOMAIN}/${router.pathname}`} />
            <meta property="og:title" content={`Web dev tuts | ${APP_NAME}`} />
            <meta 
                property="og:description" 
                content="Programming blogs - react node" 
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    const showAllCategories = () => {
        return categories.map((category, i) => (
            <Link href={`/categories/${category.slug}`} key={i}>
                <a>{category.name}</a>
            </Link>
        ));
    }

    const showAllTags = () => {
        return tags.map((tag, i) => (
            <Link href={`/tags/${tag.slug}`} key={i}>
                <a>#{tag.name}</a>
            </Link>
        ));
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1" key={i}>
                    <Card blog={blog} />
                </article>
            );
        });
    }

    return (
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="uk-container">
                        <div data-uk-grid>
                            <div className="uk-width-1-1">
                                <div className="categoreis_tags-content uk-margin-medium-top">
                                    <header>
                                        <div className="heading">
                                            <h2 className="uk-text-uppercase uk-text-center uk-margin-medium-bottom">Programming Blogs and Tutorials</h2>
                                        </div>
                                        <section>
                                            <div className="cats">
                                                {showAllCategories()}
                                            </div>
                                            <div className="tags">
                                                {showAllTags()}
                                            </div>
                                        </section>
                                    </header>
                                </div>
                            </div>
                            <div className="uk-width-1-1">
                                <div className="uk-grid-small" data-uk-grid>
                                    {showAllBlogs()}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </Fragment>
    )
}

Blogs.getInitialProps = () => {
    return blogsWithCategoriesAndTags().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size
            }
        }
    });
}

export default withRouter(Blogs);