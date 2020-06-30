import { Fragment } from 'react';
import { APP_NAME } from '../../config';
import Link from 'next/link';
import Router from 'next/router';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus, faSignOutAlt, faTachometerAlt, faBlog } from '@fortawesome/free-solid-svg-icons';
import { signout, isAuth } from '../../actions/auth';

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
                            <Link href="/">
                                <a className="uk-navbar-item uk-logo uk-text-uppercase logo">{APP_NAME}</a>
                            </Link>
                        </div>
                        <div className="uk-navbar-right">
                            <ul className="uk-navbar-nav uk-visible@s">
                                <li className="navLink">
                                    <Link href="/blogs">
                                        <a>Blogs <span><FontAwesomeIcon icon={faBlog} /></span></a>
                                    </Link>
                                </li>
                                {!isAuth() && <Fragment>
                                    <li className="navLink">
                                        <Link href="/signup">
                                            <a>SignUp <span><FontAwesomeIcon icon={faUserPlus} /></span></a>
                                        </Link>
                                    </li>
                                    <li className="navLink">
                                        <Link href="/signin">
                                            <a>SignIn <span><FontAwesomeIcon icon={faSignInAlt} /></span></a>
                                        </Link>
                                    </li>
                                </Fragment>}
                                {isAuth() && isAuth().role === 0 && (
                                    <li className="navLink">
                                        <a href="/user">Dashboard <span><FontAwesomeIcon icon={faTachometerAlt} /></span></a>
                                    </li>
                                )}
                                {isAuth() && isAuth().role === 1 && (
                                    <li className="navLink">
                                        <a href="/admin">Dashboard <span><FontAwesomeIcon icon={faTachometerAlt} /></span></a>
                                    </li>
                                )}
                                {isAuth() && (
                                    <li className="navLink">
                                        <a onClick={() => signout(() => {Router.replace('/signin')})}>SignOut <span><FontAwesomeIcon icon={faSignOutAlt} /></span></a>
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
