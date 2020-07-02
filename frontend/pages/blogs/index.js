import { useState } from 'react';
import Head from 'next/head';
import './index.scss';
import Layout from '../../components/layout/Layout';
import { blogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';

const Blogs = ({ blogs, categories, tags, size }) => {

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