import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';   
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getCookie, isAuth } from '../../actions/auth';
import { createBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';

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
        // console.log(e.target.value);
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
        console.log('Blog published!');

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
                    success: `A new blog titled ${data.title} is created`
                });
                setBody('');
                setCategories([]);
                setTags([]);
            }
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
                            required
                        />
                    </div>
                </div>
                <div className="form-inputs">
                    <ReactQuill 
                        modules={CreateBlog.modules}
                        formats={CreateBlog.formats}
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
                            <input onChange={handleChange('photo')} type="file" accept="image/*" />
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">Select</button>
                        </div>
                    </div>
                </div>
                <div className="uk-width-1-2@m">
                    <div className="blog-form">
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
            
            <hr />
            {JSON.stringify(title)}
            <hr />
            {JSON.stringify(body)}
            <hr />
        </div>
    )
}


CreateBlog.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'orderd' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
}

CreateBlog.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
]

export default withRouter(CreateBlog);