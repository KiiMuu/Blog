import Layout from '../../components/layout/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
                                            <Link href="/admin/crud/category-tag">
                                                <a className="uk-text-uppercase">Create Category</a>
                                            </Link>
                                            <span className="uk-float-right"><FontAwesomeIcon icon={faPlus} /></span>
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