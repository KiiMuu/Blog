import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import './Crud.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '../../actions/auth';
import { createCategory, getCategories, removeCategory } from '../../actions/category';

const CreateBlog = () => {
    return (
        <div><h2>Create Blog Page</h2></div>
    )
}

export default CreateBlog;