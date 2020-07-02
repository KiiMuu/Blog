import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {

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

    return (
        <div className="blog-item uk-margin-small-top">
            <header>
                <div className="blog-image">
                    <section>
                        <img 
                            src={`${API}/blog/photo/${blog.slug}`} 
                            alt={blog.title} 
                            draggable="false" 
                            // style={{ maxHeight: '250px' }}
                        />
                    </section>
                </div>
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
                    <div className="cats">
                        <div>{showBlogCategories(blog)}</div>
                    </div>
                    <div className="tags">
                        <div>{showBlogTags(blog)}</div>
                    </div>
                </div>
                <div className="blog-excerpt">
                    <p>{renderHTML(blog.excerpt)}</p>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>Read More <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Card;