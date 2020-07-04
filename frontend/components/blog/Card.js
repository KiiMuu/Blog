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
                        />
                    </section>
                </div>
            </header>
            <section className="card-content">
                <div className="card-title">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h2>{blog.title}</h2></a>
                    </Link>
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