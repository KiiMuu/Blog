import { useState, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { blogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

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

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;

        blogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([
                    ...loadedBlogs,
                    ...data.blogs
                ]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (<div className="load-more"><a onClick={loadMore} className="uk-text-uppercase">Show more <span><FontAwesomeIcon icon={faArrowRight} /></span></a></div>)
        )
    }

    const showAllCategories = () => {
        return categories.map((category, i) => (
            <Link href={`/categories/${category.slug}`} key={i}>
                <a title={`${category.name} category`}>{category.name}</a>
            </Link>
        ));
    }

    const showAllTags = () => {
        return tags.map((tag, i) => (
            <Link href={`/tags/${tag.slug}`} key={i}>
                <a title={`${tag.name} tag`}>#{tag.name}</a>
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

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => {
            return <article className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1" key={i}>
                <Card blog={blog} />
            </article>
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
                                                {categories.length === 0 ? <div className="no-cats">There're no categories were added yet.</div> : showAllCategories()}
                                            </div>
                                            <div className="tags">
                                                {tags.length === 0 ? <div className="no-tags">There're no tags were added yet.</div> : showAllTags()}
                                            </div>
                                        </section>
                                    </header>
                                </div>
                            </div>
                            <div className="uk-width-1-1">
                                <div className="uk-grid-small" data-uk-grid>
                                    {showAllBlogs()}
                                    {showLoadedBlogs()}
                                </div>
                            </div>
                            <div className="loadmore-btn uk-text-center">
                                {loadMoreButton()}
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </Fragment>
    )
}

Blogs.getInitialProps = () => {

    let skip = 0;
    let limit = 3;

    return blogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            }
        }
    });
}

export default withRouter(Blogs);