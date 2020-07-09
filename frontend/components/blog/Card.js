import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import { API } from '../../config';

const Card = ({ blog }) => {
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