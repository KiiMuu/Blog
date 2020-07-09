import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';   
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { getCookie, isAuth } from '../../actions/auth';
import { listBlogs, removeBlog } from '../../actions/blog';

const ReadBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        listBlogs().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    }

    const deleteBlog = slug => {
        let answer = window.confirm('Are you sure you want to delete?');

        if (answer) {
            removeBlog(slug, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setMessage(data.message);
                    loadBlogs();
                }
            });
        }
    }

    const showAllBlog = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="uk-width-1-3@l uk-width-1-2@m uk-width-1-1">
                    <div className="blog-content">
                        <h3>{blog.title}</h3>
                        <p>Written by {blog.postedBy.name}</p>
                        <p>Published on {moment(blog.updatedAt).fromNow()}</p>
                        <div className="blog-control">
                            <button onClick={() => deleteBlog(blog.slug)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (
        <Fragment>
            <div>{message && <div>{message}</div>}</div>
            {showAllBlog()}
        </Fragment>
    )
}

export default ReadBlogs;