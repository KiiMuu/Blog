import { useState, useEffect } from 'react';  
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '../../actions/auth';
import { createBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quil';

const CreateBlog = ({ router }) => {

    // get blog from localStorage && set it as initial state to body
    const blogFromLS = () => {
        if (typeof window === 'undefined') return false;

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    }

    // initial states
    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        });
        initialCategories();
        initialTags();
    }, [router]);

    // get categories and tags
    const initialCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setCategories(data);
            }
        });
    }

    const initialTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setTags(data);
            }
        });
    }

    // evenet handlers
    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);

        setValues({
            ...values,
            [name]: value,
            formData,
            error: ''
        });
    }

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    }

    const handleCatToggle = category => () => {
        setValues({
            ...values,
            error: ''
        });

        // return the first index or -1
        const clickedCategory = checkedCat.indexOf(category);
        const all = [...checkedCat];

        if (clickedCategory === -1) {
            all.push(category);
        } else {
            all.splice(clickedCategory, 1);
        }

        console.log(all);
        setCheckedCat(all);
        formData.set('categories', all);
    }

    const handleTagToggle = tag => () => {
        setValues({
            ...values,
            error: ''
        });

        // return the first index or -1
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }

        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    }

    // show categories and tags
    const showCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <span key={i}>
                    <input onChange={handleCatToggle(category._id)} type="checkbox" className="uk-checkbox" />
                    <label>{category.name}</label>
                </span>
            ))
        );
    }

    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <span key={i}>
                    <input onChange={handleTagToggle(tag._id)} type="checkbox" className="uk-checkbox" />
                    <label>{tag.name}</label>
                </span>
            ))
        );
    }

    const handleSubmit = e => {
        e.preventDefault();

        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,
                    title: '',
                    error: '',
                    success: `A new blog titled "${data.title}" is created`
                });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    }

    // messages
    const showError = () => {
        if (error) {
            return (
                <div className="alert-message" onMouseMove={handleMouseMove}>
                    <p 
                        className="message error"
                        style={{
                            opacity: error ? '1' : '0'
                        }}
                    >{error} <span><FontAwesomeIcon icon={faExclamationCircle} /></span></p>
                </div>
            )
        }
    }

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert-message" onMouseMove={handleMouseMove}>
                    <p 
                        className="message success"
                        style={{
                            opacity: success ? '1' : '0'
                        }}
                    >{success} <span><FontAwesomeIcon icon={faCheckCircle} /></span></p>
                </div>
            )
        }
    }

    const handleMouseMove = () => {
        setValues({
            ...values,
            error: false,
            success: false
        });
    }

    const blogForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <label className="uk-form-label uk-text-uppercase" htmlFor="blogTitle">Blog Title</label>
                    <div className="uk-form-controls">
                        <input
                            className="uk-input uk-margin-small-bottom"
                            id="blogTitle"
                            type="text"
                            placeholder="Type blog name"
                            onChange={handleChange('title')}
                            value={title}
                        />
                    </div>
                </div>
                <div className="form-inputs">
                    <ReactQuill 
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body} 
                        placeholder="Write something to publish..." 
                        onChange={handleBody}
                    />
                </div>
                <div className="create-btn">
                    <button className="uk-text-uppercase" type="submit">Publish</button>
                </div>
            </form>
        );
    }

    return (
        <div className="blog_creation-content">
            <div className="uk-grid-small" data-uk-grid>
                <div className="uk-width-1-1">
                    <div className="featured-img">
                        <h5 className="uk-text-uppercase">Featured image</h5>
                        <small>Max size: 1MB</small>
                        <div data-uk-form-custom>
                            <input onChange={handleChange('photo')} type="file" accept="image/*" required />
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">Select</button>
                        </div>
                    </div>
                </div>
                <div className="uk-width-1-2@m">
                    <div className="blog-form">
                        {showError()}
                        {showSuccess()}
                        {blogForm()}
                    </div>
                </div>
                <div className="uk-width-1-2@m">
                    <div className="categories-tags">
                        <div className="categories">
                            <h5 className="uk-text-uppercase">Categories</h5>
                            <div className="categories-items">
                                {showCategories()}
                            </div>
                        </div>
                        <hr className="uk-divider-small" />
                        <div className="tags">
                            <h5 className="uk-text-uppercase">Tags</h5>
                            <div className="tags-items">
                                {showTags()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateBlog);