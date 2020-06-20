import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({
                    ...values,
                    tags: data
                });
            }
        });
    }

    const showTags = () => {
        if (tags.length === 0) {
            return <p className="no-tags">There're no tags, you can add some.</p>
        }

        return tags.map((tag, i) => {
            return <button className="tag-name" onDoubleClick={() => handleDelete(tag.slug)} title="Double click to delete" key={i}>#{tag.name}</button>
        });
    }

    const handleDelete = slug => {
        let answer = window.confirm('Are you sure you want to delete?');

        if (answer) {
            removeTag(slug, token).then(data => {
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

        createTag({name}, token).then(data => {
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
                    >Tag is created <span><FontAwesomeIcon icon={faCheckCircle} /></span></p>
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
                    >Tag already exists <span><FontAwesomeIcon icon={faExclamationCircle} /></span></p>
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
                    >Tag is removed <span><FontAwesomeIcon icon={faTrash} /></span></p>
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

    const newTagForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-inputs">
                <label className="uk-form-label uk-text-uppercase" htmlFor="tagName">Tag Name</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        id="tagName"
                        type="text"
                        placeholder="Type tag name"
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
            {newTagForm()}
            {showTags()}
        </div>
    </Fragment>
}

export default Tag;