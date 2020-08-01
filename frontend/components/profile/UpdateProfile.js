import { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getProfile, updateProfile } from '../../actions/user';
import './Profile.scss';

const UpdateProfile = () => {

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        about: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const { username, name, email, password, about, error, success, loading, photo, userData } = values;

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

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);

        setValues({
            ...values,
            [name]: value,
            userData: userFormData,
            error: false,
            success: false
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        setValues({
            ...values,
            loading: true
        });

        updateProfile(token, userData).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false,
                    loading: false
                });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    success: true,
                    loading: false
                });
            }
        });
    }

    const updateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="uk-child-width-1-2@m" data-uk-grid>
                <div className="input">
                    <label htmlFor="photo">Photo</label>
                    <input 
                        id="photo" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleChange('photo')}
                    />
                </div>
                <div className="input">
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        value={username}
                        onChange={handleChange('username')}
                    />
                </div>
                <div className="input">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        value={name}
                        onChange={handleChange('name')}
                    />
                </div>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="input">
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={handleChange('password')}
                    />
                </div>
            </div>
            <div className="input">
                <label htmlFor="about">About you</label>
                <textarea
                    id="about" 
                    type="text"
                    value={about}
                    onChange={handleChange('about')}
                ></textarea>
            </div>
            <div className="control">
                <button type="submit">Update</button>
            </div>
        </form>
    )

    return (
        <Fragment>
            <div className="uk-width-1-4@m">
                <div className="user-img">image</div>
            </div>
            <div className="uk-width-3-4@m">
                <div className="update-form">
                    {updateForm()}
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile;