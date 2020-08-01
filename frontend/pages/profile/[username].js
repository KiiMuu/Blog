import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { userPublicProfile } from '../../actions/user';
import Link from 'next/link';
import moment from 'moment';
import './profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faClock } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME, API, DOMAIN, FB_APP_ID } from "../../config";

const UserProfile = ({ user, blogs, query }) => {

    const head = () => (
        <Head>
            <title>{user.username} | {APP_NAME}</title>
            <meta 
                name="description" 
                content={`Blogs by ${user.username}`}
            />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta 
                property="og:description" 
                content={`Blogs by ${user.username}`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/public/img/seoblog.png`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1" key={i}>
                    <div className="blog-item">
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>{blog.title}</a>
                        </Link>
                    </div>
                </div>
            )
        });
    }

    return (
        <Fragment>
            {head()}
            <Layout>
                <div className="user-profile uk-text-center uk-margin-medium-top">
                    <div className="uk-container uk-container-small">
                        <img
                            src={`${API}/user/photo/${user.username}`}
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt={`${user.username} photo`}
                        />
                        <h3 className="uk-text-uppercase">{user.name}</h3>
                        <p><span><FontAwesomeIcon icon={faClock} /></span>Joined {moment(user.createdAt).fromNow()}</p>
                    </div>
                </div>
                <div className="user-blogs uk-margin-medium-top">
                    <div className="uk-container uk-container-small">
                        <h4>{user.name}'s blogs</h4>
                        <div className="uk-grid-small" data-uk-grid>
                            {blogs.length === 0 ? <div className="uk-text-center">{user.name} has no blogs</div> : showUserBlogs()}
                        </div>
                    </div>
                </div>
                <div className="user-contact uk-margin-medium-top">
                    <div className="uk-container uk-container-small">
                        <div className="uk-grid-small" data-uk-grid>
                            <div className="uk-width-1-2@m">
                                <h4>Message {user.name}</h4>
                                <p>contact user</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

UserProfile.getInitialProps = ({ query }) => {
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                user: data.user,
                blogs: data.blogs,
                query
            }
        }
    });
}

export default UserProfile;