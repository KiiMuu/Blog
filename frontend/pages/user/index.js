import Layout from '../../components/layout/Layout';
import Private from '../../components/auth/Private';
import '../admin/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faEdit, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { isAuth } from '../../actions/auth';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="user-dashboard uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="dash-heading uk-text-center">
                            <h2 className="uk-text-uppercase">
                                {isAuth() && `${isAuth().name}`}'<span className="uk-text-lowercase">s</span> Dashboard
                            </h2>
                        </div>
                        <div data-uk-grid>
                            <div className="uk-width-1-4@m">
                                <div className="sidebar">
                                    <ul className="uk-list">
                                        <li>
                                            <a href="/user/crud/blog" className="uk-text-uppercase">Create Blog</a>
                                            <span className="uk-float-right create-blog"><FontAwesomeIcon icon={faBlog} /></span>
                                        </li>
                                        <li>
                                            <a href="/user/crud/blogs" className="uk-text-uppercase">Update/Delete Blogs</a>
                                            <span className="uk-float-right update-blog"><FontAwesomeIcon icon={faEdit} /></span>
                                        </li>
                                        <li>
                                            <a href="/user/update" className="uk-text-uppercase">Update Profile</a>
                                            <span className="uk-float-right update-profile"><FontAwesomeIcon icon={faUserAlt} /></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="uk-child-3-4@m">
                                <div className="admin-content">
                                    <h1 className="uk-text-uppercase" style={{ margin: '0', fontWeight: '900', letterSpacing: '2px' }}>User Area</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default UserIndex;