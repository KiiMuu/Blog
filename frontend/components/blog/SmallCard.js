import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SmallCard = ({ blog }) => {
    return (
        <div className="blog-item uk-margin-small-top">
            <section className="card-content">
                <div className="card-title">
                    <h4>{blog.title}</h4>
                </div>
                <span>Created by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link></span>
                <div className="blog-excerpt">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>View Blog <span><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default SmallCard;