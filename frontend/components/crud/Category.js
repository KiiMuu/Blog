import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '../../actions/auth';
import { createCategory, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [reload, removed]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({
                    ...values,
                    categories: data
                });
            }
        });
    }

    const showCategories = () => {
        if (categories.length === 0) {
            return <p className="no-categories">There're no categories, you can add some.</p>
        }

        return categories.map((category, i) => {
            return <button className="category-name" onDoubleClick={() => handleDelete(category.slug)} title="Double click to delete" key={i}>{category.name}</button>
        });
    }

    const handleDelete = slug => {
        let answer = window.confirm('Are you sure you want to delete?');

        if (answer) {
            removeCategory(slug, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({
                        ...values,
                        error: false,
                        success: false,
                        name: '',
                        removed: !removed,
                        reload: !reload
                    });
                }
            });
        }
    }

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
                    name: '',
                    reload: !reload
                });
            }
        });
    }

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert-message">
                    <p 
                        className="message success"
                        style={{
                            opacity: success ? '1' : '0'
                        }}
                    >Category is created <span><FontAwesomeIcon icon={faCheckCircle} /></span></p>
                </div>
            )
        }
    }

    const showError = () => {
        if (error) {
            return (
                <div className="alert-message">
                    <p 
                        className="message error"
                        style={{
                            opacity: error ? '1' : '0'
                        }}
                    >Category already exists <span><FontAwesomeIcon icon={faExclamationCircle} /></span></p>
                </div>
            )
        }
    }

    const showRemoved = () => {
        if (removed) {
            return (
                <div className="alert-message">
                    <p 
                        className="message removed"
                        style={{
                            opacity: removed ? '1' : '0'
                        }}
                    >Category is removed <span><FontAwesomeIcon icon={faTrash} /></span></p>
                </div>
            )
        }
    }

    const handleMouseMove = () => {
        setValues({
            ...values,
            error: false,
            success: false,
            removed: ''
        });
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-inputs">
                <label className="uk-form-label uk-text-uppercase" htmlFor="catName">Category Name</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        id="catName"
                        type="text"
                        placeholder="Type category name"
                        onChange={handleChange}
                        value={name}
                        required
                    />
                </div>
            </div>
            <div className="create-btn">
                <button className="uk-text-uppercase" type="submit">Create</button>
            </div>
        </form>
    );

    return <Fragment>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        <div onMouseMove={handleMouseMove}>
            {newCategoryForm()}
            {showCategories()}
        </div>
    </Fragment>
}

export default Category;