import Layout from '../../components/layout/Layout';
import Private from '../../components/auth/Private';
import UpdateProfile from '../../components/profile/UpdateProfile';
import '../admin/index.scss';

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className="user-dashboard uk-margin-medium-top">
                    <div className="uk-container">
                        <div className="dash-heading uk-text-center">
                            <h2 className="uk-text-uppercase">
                                Update Profile
                            </h2>
                        </div>
                        <div data-uk-grid>
                            <UpdateProfile />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default UserProfileUpdate;