import { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getProfile, updateProfile } from '../../actions/user';

const UpdateProfile = () => {

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const { username, name, email, password, error, success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about
                });
            }
        });
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Fragment>
            <div className="uk-width-1-1">
                <div className="user-img">image</div>
                <div className="update-form">
                    {JSON.stringify({username, email, name, password})}
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile;