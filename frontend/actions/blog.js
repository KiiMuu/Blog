import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { API } from '../config';
import { isAuth } from './auth';

export const createBlog = (blog, token) => {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/blog`;
    } else if (isAuth() && isAuth().role === 0) {
        createBlogEndpoint = `${API}/user/blog`;
    }

    return fetch(`${createBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const blogsWithCategoriesAndTags = (skip, limit) => {

    const data = {
        limit, skip
    }

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const readBlog = slug => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const relatedBlogs = blog => {
    return fetch(`${API}//blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const listBlogs = (username) => {
    let listBlogsEndpoint;

    if (username) {
        listBlogsEndpoint = `${API}/${username}/blogs`;
    } else {
        listBlogsEndpoint = `${API}/blogs`;
    }

    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const removeBlog = (slug, token) => {
    let removeBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        removeBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        removeBlogEndpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${removeBlogEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const updateBlog = (blog, token, slug) => {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${updateBlogEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}


export const blogsSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);

    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}