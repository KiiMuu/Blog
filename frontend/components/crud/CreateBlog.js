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
    return (
        <div>
            <h2>Create Blog Page</h2>
            {JSON.stringify(router)} 
        </div>
    )
}

export default withRouter(CreateBlog);