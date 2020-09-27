import Head from 'next/head';
import { Fragment } from 'react';
import Layout from '../../components/layout/Layout';
import Private from '../../components/auth/Private';
import UpdateProfile from '../../components/profile/UpdateProfile';
import '../admin/index.scss';

const UserProfileUpdate = () => {
    return (
        <Fragment>
            <Head>
                <title>Bloggawy | Update Profile</title>
            </Head>
            <Layout>
                <Private>
                    <div className="user-dashboard uk-margin-medium-top">
                        <div className="uk-container uk-container-small">
                            <div className="dash-heading uk-text-center">
                                <h2 className="uk-text-uppercase">
                                    Update Profile
                                </h2>
                            </div>
                            <div className="uk-grid-small" data-uk-grid>
                                <UpdateProfile />
                            </div>
                        </div>
                    </div>
                </Private>
            </Layout>
        </Fragment>
    )
}

export default UserProfileUpdate;