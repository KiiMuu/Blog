import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { blogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import moment from 'moment';

const Blogs = ({ blogs, categories, tags, size }) => {

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1" key={i}>
                    <div className="blog-item uk-margin-small-top">
                        <header>
                            <div className="blog-image">Blog image</div>
                        </header>
                        <section className="blog-content">
                            <div className="blog-title">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a><h2>{blog.title}</h2></a>
                                </Link>
                            </div>
                            <div className="creator">
                                <p><span>Blogger</span>: {blog.postedBy.name}</p>
                                <p>Published {moment(blog.createdAt).fromNow()}</p>
                            </div>
                            <div className="blog-tags-cats">
                                <p>blog tags and cats</p>
                            </div>
                            <div className="blog-excerpt">
                                <p>{renderHTML(blog.excerpt)}</p>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a>Read More <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                                </Link>
                            </div>
                        </section>
                    </div>
                </article>
            );
        });
    }

    return (
        <Layout>
            <main>
                <div className="uk-container">
                    <div className="categoreis_tags-content uk-margin-medium-top">
                        <header>
                            <div className="heading">
                                <h2 className="uk-text-uppercase uk-text-center">Programming Blogs and Tutorials</h2>
                            </div>
                            <section>
                                <p>Show cats and tags</p>
                            </section>
                        </header>
                    </div>
                    <div className="uk-grid-small" data-uk-grid>
                        {showAllBlogs()}
                    </div>
                </div>
            </main>
        </Layout>
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

export default Blogs;