import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './Category.scss';
import { isAuth, getCookie } from '../../../actions/auth';
import { createCategory } from '../../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false
    });

    const { name, error, success, categories, removed } = values;
    const token = getCookie('token');

    const handleChange = e => {
        setValues({
            ...values,
            name: e.target.value,
            error: false,
            success: false,
            removed: ''
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        createCategory({name}, token).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false
                });
            } else {
                setValues({
                    ...values,
                    error: false,
                    success: true,
                    name: ''
                });
            }
        });
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-inputs">
                <label className="uk-form-label" for="name">Name</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        id="name"
                        type="text"
                        placeholder="Type catgeory name"
                        onChange={handleChange}
                        value={name}
                        required
                    />
                </div>
            </div>
            <div className="create-btn">
                <button type="submit">Create</button>
            </div>
        </form>
    );

    return <Fragment>
        {newCategoryForm()}
    </Fragment>
}

export default Category;