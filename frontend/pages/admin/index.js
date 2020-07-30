import Layout from '../../components/layout/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBlog, faEdit } from '@fortawesome/free-solid-svg-icons';
import { isAuth } from '../../actions/auth';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="admin-dashboard uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="dash-heading uk-text-center">
                            <h2 className="uk-text-uppercase">
                                {isAuth() && `${isAuth().name}`}'<span className="uk-text-lowercase">s</span> Dashboard
                            </h2>
                            <sup>Admin</sup>
                        </div>
                        <div data-uk-grid>
                            <div className="uk-width-1-4@m">
                                <div className="sidebar">
                                    <ul className="uk-list">
                                        <li>
                                            <a href="/admin/crud/category-tag" className="uk-text-uppercase">Create Category &amp; Tag</a>
                                            <span className="uk-float-right plus"><FontAwesomeIcon icon={faPlus} /></span>
                                        </li>
                                        <li>
                                            <a href="/admin/crud/blog" className="uk-text-uppercase">Create Blog</a>
                                            <span className="uk-float-right create-blog"><FontAwesomeIcon icon={faBlog} /></span>
                                        </li>
                                        <li>
                                            <a href="/admin/crud/blogs" className="uk-text-uppercase">Update/Delete Blogs</a>
                                            <span className="uk-float-right update-blog"><FontAwesomeIcon icon={faEdit} /></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="uk-child-3-4@m">
                                Content
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex;