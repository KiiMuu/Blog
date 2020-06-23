import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';   
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons';
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

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = values;

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        });
    }, [router]);

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

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Blog published!');
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
        <div>
            {blogForm()}
            {JSON.stringify(title)}
            {JSON.stringify(body)}
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