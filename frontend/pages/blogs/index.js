import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { blogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';

const Blogs = () => {
    return (
        <Layout>
            <main>
                <div className="uk-container">
                    <header>
                        <div className="uk-width-1-1" data-uk-grid>
                            <h1>Programming Blog and Tutorials</h1>
                        </div>
                        <section>
                            <p>Show cats and tags</p>
                        </section>
                    </header>
                </div>
                <div className="uk-container">
                    <div className="uk-width-1-1" data-uk-grid>
                        <span>Show all blogs</span>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Blogs;