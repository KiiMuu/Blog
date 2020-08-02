import { Fragment } from 'react';
import { APP_NAME } from '../../config';
import Router from 'next/router';
import './Header.scss';
import { signout, isAuth } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from '../blog/Search';

import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <div className="uk-container">
                    <nav data-uk-navbar>
                        <div className="uk-navbar-left">
                            <a href="/" className="uk-navbar-item uk-logo uk-text-uppercase logo">{APP_NAME}</a>
                        </div>
                        <div className="uk-navbar-right">
                            <ul className="uk-navbar-nav uk-visible@s">
                                <li className="navSearch">
                                    <a title="Find Blogs?"><span><FontAwesomeIcon icon={faSearch} /></span></a>
                                    <div data-uk-dropdown="mode: click; animation: uk-animation-slide-top-small">
                                        <div className="uk-nav uk-dropdown-nav">
                                            <Search />
                                        </div>
                                    </div>
                                </li>
                                <li className="navLink">
                                    <a href="/blogs">Blogs</a>
                                </li>
                                <li className="navLink">
                                    <a href="/user/crud/blog">Create a Blog</a>
                                </li>
                                {!isAuth() && <Fragment>
                                    <li className="navLink">
                                        <a href="/signup">SignUp</a>
                                    </li>
                                    <li className="navLink">
                                        <a href="/signin">SignIn</a>
                                    </li>
                                </Fragment>}
                                {isAuth() && isAuth().role === 0 && (
                                    <li className="navLink">
                                        <a href="/user">Dashboard</a>
                                    </li>
                                )}
                                {isAuth() && isAuth().role === 1 && (
                                    <li className="navLink">
                                        <a href="/admin">Dashboard</a>
                                    </li>
                                )}
                                <li className="navLink">
                                    <a href="/contact">Contact</a>
                                </li>
                                {isAuth() && (
                                    <li className="navLink">
                                        <a onClick={() => signout(() => {Router.replace('/signin')})}>SignOut</a>
                                    </li>
                                )}
                            </ul>
                            {/* Show Nav items in sidebar in phone screens */}
                            <div className="uk-hidden@s">
                                <button className="uk-button menuBtn" type="button" data-uk-toggle="target: #offcanvas-overlay">Menu</button>
                                <div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
                                    <div className="uk-offcanvas-bar">
                                        <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                                        <span>{APP_NAME}</span>
                                        <ul className="uk-nav uk-nav-default">
                                            <li><a href="#">Item</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header;
