import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import renderHTML from 'react-render-html';
import { API } from '../../config';

const SmallCard = ({ blog }) => {
    return (
        <div className="blog-item uk-margin-small-top">
            <section className="card-content">
                <div className="card-title">
                    <h4>{blog.title}</h4>
                </div>
                <div className="blog-excerpt">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>Show Blog <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default SmallCard;